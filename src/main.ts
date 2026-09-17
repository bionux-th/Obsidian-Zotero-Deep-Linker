import {
  App,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TextComponent,
} from "obsidian";
import { get as httpGet } from "node:http";

interface ZoteroLinkerSettings {
  apiUrl: string;
  resultLimit: number;
  collectionColumnMinWidth: number;
}

interface ZoteroData {
  key: string;
  itemType?: string;
  parentItem?: string;
  title?: string;
  firstCreator?: string;
  date?: string;
  publicationTitle?: string;
  DOI?: string;
  filename?: string;
  annotationType?: string;
  annotationPageLabel?: string;
  annotationText?: string;
  annotationComment?: string;
}

interface ZoteroItem {
  key: string;
  data: ZoteroData;
}

interface ZoteroCollectionData {
  name?: string;
  parentCollection?: string | false;
}

interface ZoteroCollection {
  key: string;
  data: ZoteroCollectionData;
}

const DEFAULT_SETTINGS: ZoteroLinkerSettings = {
  apiUrl: "http://127.0.0.1:23119",
  resultLimit: 30,
  collectionColumnMinWidth: 150,
};

function cleanApiUrl(url: string): string {
  // The plugin appends Zotero's `/api/...` path itself.  Accept a pasted
  // Local API URL ending in `/api` as well, to avoid generating `/api/api/...`.
  return url.replace(/\/+$/, "").replace(/\/api$/i, "");
}

async function getLocalJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const request = httpGet(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk: string) => (body += chunk));
      response.on("error", reject);
      response.on("end", () => {
        const status = response.statusCode ?? 0;
        if (status < 200 || status >= 300) {
          reject(new Error(`Zotero 返回 HTTP ${status}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error("Zotero 返回的不是有效 JSON"));
        }
      });
    });
    request.setTimeout(5_000, () => request.destroy(new Error("连接 Zotero 超时")));
    request.on("error", reject);
  });
}

function textPreview(value: string | undefined, limit = 100): string {
  const compact = (value ?? "").replace(/\s+/g, " ").trim();
  return compact.length > limit ? `${compact.slice(0, limit)}…` : compact;
}

function pageLabel(data: ZoteroData): string {
  return data.annotationPageLabel ? `第 ${data.annotationPageLabel} 页` : "未记录页码";
}

export default class ZoteroDeepLinkerPlugin extends Plugin {
  settings: ZoteroLinkerSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new ZoteroLinkerSettingTab(this.app, this));
    this.addCommand({
      id: "insert-zotero-deep-link",
      name: "添加 Zotero 深链接",
      editorCallback: (editor) => new ZoteroSearchModal(this.app, this, (markdown) => editor.replaceSelection(markdown)).open(),
    });
    this.addRibbonIcon("link", "添加 Zotero 深链接", () => {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!view) {
        new Notice("请先打开一个 Markdown 笔记，以便插入链接。");
        return;
      }
      new ZoteroSearchModal(this.app, this, (markdown) => view.editor.replaceSelection(markdown)).open();
    });
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  async getItems(path: string, params: Record<string, string> = {}): Promise<ZoteroItem[]> {
    return this.getRecords<ZoteroItem>(path, params);
  }

  private async getRecords<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
    const query = new URLSearchParams({ format: "json", include: "data", ...params });
    const url = `${cleanApiUrl(this.settings.apiUrl)}${path}?${query.toString()}`;
    try {
      const payload = await getLocalJson(url);
      if (!Array.isArray(payload)) {
        throw new Error("Zotero 返回了意外的数据格式");
      }
      return payload as T[];
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(`无法连接 Zotero Local API（${detail}）。请确认 Zotero 正在运行并已启用本地 API。`);
    }
  }

  async search(query: string): Promise<ZoteroItem[]> {
    const items = await this.getItems("/api/users/0/items", {
      q: query,
      limit: String(this.settings.resultLimit),
    });
    return items.filter((item) => !["attachment", "note", "annotation"].includes(item.data.itemType ?? ""));
  }

  async getCollections(): Promise<ZoteroCollection[]> {
    return this.getRecords<ZoteroCollection>("/api/users/0/collections", { limit: "100" });
  }

  async getBrowseItems(collectionKey?: string): Promise<ZoteroItem[]> {
    const path = collectionKey
      ? `/api/users/0/collections/${encodeURIComponent(collectionKey)}/items/top`
      : "/api/users/0/items/top";
    const pageSize = 100;
    const allItems: ZoteroItem[] = [];
    for (let start = 0; ; start += pageSize) {
      const page = await this.getItems(path, {
        limit: String(pageSize),
        start: String(start),
        sort: "title",
        direction: "asc",
      });
      allItems.push(...page);
      if (page.length < pageSize) break;
    }
    return allItems.filter((item) => !["attachment", "note", "annotation"].includes(item.data.itemType ?? ""));
  }

  async getAttachments(itemKey: string): Promise<ZoteroItem[]> {
    const children = await this.getItems(`/api/users/0/items/${itemKey}/children`, { limit: "100" });
    return children.filter((item) => item.data.itemType === "attachment" && /pdf/i.test(item.data.filename ?? item.data.title ?? ""));
  }

  async getAnnotations(pdfKey: string): Promise<ZoteroItem[]> {
    const items = await this.getItems("/api/users/0/items", { itemKey: pdfKey, limit: "100" });
    return items.filter((item) => item.data.itemType === "annotation" && item.data.parentItem === pdfKey);
  }

  insert(callback: (markdown: string) => void, markdown: string): void {
    callback(markdown);
    new Notice("已插入 Zotero 链接。");
  }
}

class ZoteroSearchModal extends Modal {
  private input?: TextComponent;
  private itemsEl?: HTMLElement;
  private treeEl?: HTMLElement;
  private selectedRow?: HTMLElement;
  private selectedCollectionKey?: string;
  private viewId = 0;

  constructor(
    app: App,
    private readonly plugin: ZoteroDeepLinkerPlugin,
    private readonly insert: (markdown: string) => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.modalEl.addClass("zotero-deep-linker-modal");
    this.titleEl.setText("添加 Zotero 深链接");
    this.contentEl.createEl("p", { text: "搜索文献，或从左侧收藏夹直接选择；随后选择要链接的位置。" });
    const search = new Setting(this.contentEl).setName("搜索 Zotero 文献");
    this.input = new TextComponent(search.controlEl);
    this.input.setPlaceholder("例如：DNA-CMG-Pol epsilon 或 10.1038/…");
    this.input.inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") void this.updateItems();
    });
    search.addButton((button) => button.setButtonText("搜索").setCta().onClick(() => void this.updateItems()));
    const browser = this.contentEl.createDiv({ cls: "zotero-deep-linker-browser" });
    browser.style.setProperty("--zotero-collection-column-min-width", `${this.plugin.settings.collectionColumnMinWidth}px`);
    this.treeEl = browser.createDiv({ cls: "zotero-deep-linker-collection-tree" });
    this.itemsEl = browser.createDiv({ cls: "zotero-deep-linker-library-items" });
    this.itemsEl.setText("正在读取 Zotero 收藏夹…");
    this.input.inputEl.focus();
    void this.loadCollections();
  }

  private async loadCollections(): Promise<void> {
    const viewId = ++this.viewId;
    const treeEl = this.treeEl;
    const itemsEl = this.itemsEl;
    if (!treeEl || !itemsEl) return;
    try {
      const collections = await this.plugin.getCollections();
      if (this.viewId !== viewId) return;
      const libraryRow = this.addCollectionNode(collections, treeEl, undefined, "我的文库", true);
      libraryRow.classList.add("is-active");
      this.selectedRow = libraryRow;
      await this.updateItems();
    } catch (error) {
      if (this.viewId === viewId) itemsEl.setText(error instanceof Error ? error.message : String(error));
    }
  }

  private async updateItems(): Promise<void> {
    const query = this.input?.getValue().trim() ?? "";
    const itemsEl = this.itemsEl;
    if (!itemsEl) return;
    const viewId = ++this.viewId;
    itemsEl.empty();
    itemsEl.setText(query ? "正在搜索 Zotero…" : "正在读取文献…");
    try {
      const items = query ? await this.plugin.search(query) : await this.plugin.getBrowseItems(this.selectedCollectionKey);
      if (this.viewId !== viewId) return;
      itemsEl.empty();
      if (!items.length) {
        itemsEl.setText(query ? "没有找到匹配文献。" : "这个位置没有可选择的文献条目。");
        return;
      }
      for (const item of items) this.addItemRow(itemsEl, item);
    } catch (error) {
      if (this.viewId === viewId) itemsEl.setText(error instanceof Error ? error.message : String(error));
    }
  }

  private addCollectionNode(
    collections: ZoteroCollection[],
    container: HTMLElement,
    parentKey: string | undefined,
    name: string,
    expanded = false,
  ): HTMLElement {
    const node = container.createDiv({ cls: "zotero-deep-linker-tree-node" });
    const row = node.createDiv({ cls: "zotero-deep-linker-library-row is-clickable" });
    const children = collections
      .filter((collection) => (collection.data.parentCollection || undefined) === parentKey)
      .sort((a, b) => (a.data.name || "").localeCompare(b.data.name || "", "zh-CN"));
    const toggle = row.createEl("button", { cls: "zotero-deep-linker-tree-toggle", text: children.length ? (expanded ? "▾" : "▸") : "" });
    toggle.disabled = !children.length;
    row.createSpan({ cls: "zotero-deep-linker-collection-name", text: name });
    const childrenEl = node.createDiv({ cls: "zotero-deep-linker-tree-children" });
    childrenEl.toggleClass("is-collapsed", !expanded);
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const collapsed = childrenEl.classList.toggle("is-collapsed");
      toggle.setText(collapsed ? "▸" : "▾");
    });
    row.addEventListener("click", () => {
      this.treeEl?.querySelectorAll(".zotero-deep-linker-library-row").forEach((treeRow) => treeRow.classList.remove("is-active"));
      row.classList.add("is-active");
      this.selectedRow = row;
      this.selectedCollectionKey = parentKey;
      if (this.input) this.input.setValue("");
      void this.updateItems();
    });
    for (const collection of children) {
      this.addCollectionNode(collections, childrenEl, collection.key, collection.data.name || "未命名收藏夹");
    }
    return row;
  }

  private addItemRow(container: HTMLElement, item: ZoteroItem): void {
    const row = container.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: item.data.title || "无题名条目" });
    row.createDiv({ text: [item.data.firstCreator, item.data.date, item.data.publicationTitle].filter(Boolean).join(" · ") });
    row.addEventListener("click", () => {
      this.close();
      new ZoteroTargetModal(this.app, this.plugin, item, this.insert).open();
    });
  }
}

class ZoteroTargetModal extends Modal {
  constructor(
    app: App,
    private readonly plugin: ZoteroDeepLinkerPlugin,
    private readonly item: ZoteroItem,
    private readonly insert: (markdown: string) => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText("选择 Zotero 链接对象");
    this.contentEl.createEl("h3", { text: this.item.data.title || "无题名条目" });
    this.addChoice("文献条目", "在 Zotero 中选中该文献。", () => {
      this.plugin.insert(this.insert, `[${this.item.data.title || "Zotero 条目"}](zotero://select/library/items/${this.item.key})`);
      this.close();
    });
    this.addChoice("选择 PDF 或 PDF 注释", "继续选择附件，或定位到某条高亮、批注或图片注释。", () => void this.choosePdf());
  }

  private addChoice(name: string, description: string, action: () => void): void {
    const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: name });
    row.createDiv({ text: description });
    row.addEventListener("click", action);
  }

  private async choosePdf(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.createEl("h3", { text: "选择 PDF 附件" });
    this.contentEl.createDiv({ text: "正在读取附件…" });
    try {
      const attachments = await this.plugin.getAttachments(this.item.key);
      this.contentEl.empty();
      this.contentEl.createEl("h3", { text: "选择 PDF 附件" });
      if (!attachments.length) {
        this.contentEl.createDiv({ text: "此文献没有可识别的 PDF 附件。" });
        return;
      }
      for (const attachment of attachments) {
        const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
        row.createEl("strong", { text: attachment.data.filename || "PDF 附件" });
        row.createDiv({ text: "点击直接打开 PDF；使用“注释”定位到具体标记。" });
        const buttons = row.createDiv({ cls: "zotero-deep-linker-actions" });
        const open = buttons.createEl("button", { text: "插入 PDF 链接" });
        open.addEventListener("click", (event) => {
          event.stopPropagation();
          this.plugin.insert(this.insert, `[打开 PDF：${attachment.data.filename || this.item.data.title || "Zotero"}](zotero://open-pdf/library/items/${attachment.key})`);
          this.close();
        });
        const annotations = buttons.createEl("button", { text: "选择注释" });
        annotations.addEventListener("click", (event) => {
          event.stopPropagation();
          void this.chooseAnnotation(attachment);
        });
      }
    } catch (error) {
      this.contentEl.setText(error instanceof Error ? error.message : String(error));
    }
  }

  private async chooseAnnotation(pdf: ZoteroItem): Promise<void> {
    this.contentEl.empty();
    this.contentEl.createEl("h3", { text: "选择 PDF 注释" });
    this.contentEl.createDiv({ text: "正在读取 Zotero 注释…" });
    try {
      const annotations = await this.plugin.getAnnotations(pdf.key);
      this.contentEl.empty();
      this.contentEl.createEl("h3", { text: "选择 PDF 注释" });
      if (!annotations.length) {
        this.contentEl.createDiv({ text: "这个 PDF 暂无 Zotero 注释。" });
        return;
      }
      for (const annotation of annotations) {
        const data = annotation.data;
        const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
        row.createEl("strong", { text: `${pageLabel(data)} · ${data.annotationType || "注释"}` });
        row.createDiv({ text: textPreview(data.annotationComment) || textPreview(data.annotationText) || "无文字内容（可能是图片或笔迹注释）" });
        row.addEventListener("click", () => {
          const label = `Zotero 注释：${pageLabel(data)}${data.annotationType ? ` · ${data.annotationType}` : ""}`;
          this.plugin.insert(this.insert, `[${label}](zotero://open-pdf/library/items/${pdf.key}?page=${encodeURIComponent(data.annotationPageLabel || "")}&annotation=${annotation.key})`);
          this.close();
        });
      }
    } catch (error) {
      this.contentEl.setText(error instanceof Error ? error.message : String(error));
    }
  }
}

class ZoteroLinkerSettingTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: ZoteroDeepLinkerPlugin) {
    super(app, plugin);
  }

  display(): void {
    this.containerEl.empty();
    this.containerEl.createEl("h2", { text: "Zotero Deep Linker" });
    new Setting(this.containerEl)
      .setName("Zotero Local API 地址")
      .setDesc("通常为 http://127.0.0.1:23119；需在 Zotero 设置中启用 Local API。")
      .addText((text) => text.setValue(this.plugin.settings.apiUrl).onChange(async (value) => {
        this.plugin.settings.apiUrl = cleanApiUrl(value);
        await this.plugin.saveSettings();
      }));
    new Setting(this.containerEl)
      .setName("搜索结果数量")
      .setDesc("每次搜索最多显示的 Zotero 文献数量。")
      .addSlider((slider) => slider.setLimits(10, 100, 10).setValue(this.plugin.settings.resultLimit).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.resultLimit = value;
        await this.plugin.saveSettings();
      }));
    new Setting(this.containerEl)
      .setName("文件夹列最小宽度")
      .setDesc("浏览器左侧收藏夹列的最小宽度；可根据文件夹名称长度调整。")
      .addSlider((slider) => slider.setLimits(150, 450, 10).setValue(this.plugin.settings.collectionColumnMinWidth).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.collectionColumnMinWidth = value;
        await this.plugin.saveSettings();
      }));
  }
}
