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
import { get as httpGet } from "http";

/**
 * Zotero Deep Linker for Obsidian
 * Copyright (C) 2024 Local
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const I18N = {
  zh: {
    commandName: "添加 Zotero 深链接",
    ribbonTooltip: "添加 Zotero 深链接",
    modalTitle: "添加 Zotero 深链接",
    modalHint: "搜索文献，或从左侧收藏夹直接选择；随后选择要链接的位置。",
    searchLabel: "搜索 Zotero 文献",
    searchPlaceholder: "例如：DNA-CMG-Pol epsilon 或 10.1038/…",
    searchBtn: "搜索",
    loadingCollections: "正在读取 Zotero 收藏夹…",
    loadingItems: "正在读取文献…",
    searching: "正在搜索 Zotero…",
    noResults: "没有找到匹配文献。",
    noItems: "这个位置没有可选择的文献条目。",
    libraryRoot: "我的文库",
    unnamedCollection: "未命名收藏夹",
    untitledItem: "无题名条目",
    chooseTargetTitle: "选择 Zotero 链接对象",
    choiceItem: "文献条目",
    choiceItemDesc: "在 Zotero 中选中该文献。",
    choicePdf: "选择 PDF 或 PDF 注释",
    choicePdfDesc: "继续选择附件，或定位到某条高亮、批注或图片注释。",
    pdfTitle: "选择 PDF 附件",
    pdfLoading: "正在读取附件…",
    pdfNone: "此文献没有可识别的 PDF 附件。",
    pdfOpenBtn: "插入 PDF 链接",
    pdfAnnoBtn: "选择注释",
    pdfHint: "点击直接打开 PDF；使用“注释”定位到具体标记。",
    annoTitle: "选择 PDF 注释",
    annoLoading: "正在读取 Zotero 注释…",
    annoNone: "这个 PDF 暂无 Zotero 注释。",
    pageLabelPrefix: "第 ",
    pageLabelSuffix: " 页",
    pageUnknown: "未记录页码",
    annotationTypeFallback: "注释",
    annotationNoText: "无文字内容（可能是图片或笔迹注释）",
    noticeInserted: "已插入 Zotero 链接。",
    noticeOpenMarkdown: "请先打开一个 Markdown 笔记，以便插入链接。",
    errorConnect: "无法连接 Zotero Local API（{detail}）。请确认 Zotero 正在运行并已启用本地 API。",
    errorHttp: "Zotero 返回 HTTP {status}",
    errorJson: "Zotero 返回的不是有效 JSON",
    errorTimeout: "连接 Zotero 超时",
    errorFormat: "Zotero 返回了意外的数据格式",
    settingsTitle: "Zotero Deep Linker",
    settingsApiUrl: "Zotero Local API 地址",
    settingsApiUrlDesc: "通常为 http://127.0.0.1:23119；需在 Zotero 设置中启用本地 API。",
    settingsResultLimit: "搜索结果数量",
    settingsResultLimitDesc: "每次搜索最多显示的 Zotero 文献数量。",
    settingsColWidth: "文件夹列最小宽度",
    settingsColWidthDesc: "浏览器左侧收藏夹列的最小宽度；可根据文件夹名称长度调整。",
  },
  en: {
    commandName: "Add Zotero Deep Link",
    ribbonTooltip: "Add Zotero Deep Link",
    modalTitle: "Add Zotero Deep Link",
    modalHint: "Search literature or pick from collections, then choose link target.",
    searchLabel: "Search Zotero",
    searchPlaceholder: "e.g. DNA-CMG-Pol epsilon or 10.1038/…",
    searchBtn: "Search",
    loadingCollections: "Loading Zotero collections…",
    loadingItems: "Loading items…",
    searching: "Searching Zotero…",
    noResults: "No matching items found.",
    noItems: "No selectable items in this location.",
    libraryRoot: "My Library",
    unnamedCollection: "Unnamed Collection",
    untitledItem: "Untitled Item",
    chooseTargetTitle: "Choose Zotero Link Target",
    choiceItem: "Item",
    choiceItemDesc: "Select this item in Zotero.",
    choicePdf: "PDF / Annotation",
    choicePdfDesc: "Choose attachment or locate a specific highlight/note.",
    pdfTitle: "Choose PDF Attachment",
    pdfLoading: "Loading attachments…",
    pdfNone: "No recognizable PDF attachment for this item.",
    pdfOpenBtn: "Insert PDF Link",
    pdfAnnoBtn: "Choose Annotation",
    pdfHint: "Click to open PDF; use “Annotation” to locate a specific mark.",
    annoTitle: "Choose PDF Annotation",
    annoLoading: "Loading annotations…",
    annoNone: "No annotations in this PDF.",
    pageLabelPrefix: "Page ",
    pageLabelSuffix: "",
    pageUnknown: "Page unknown",
    annotationTypeFallback: "Annotation",
    annotationNoText: "No text content (may be image or ink annotation)",
    noticeInserted: "Zotero link inserted.",
    noticeOpenMarkdown: "Please open a Markdown note first to insert the link.",
    errorConnect: "Cannot connect to Zotero Local API ({detail}). Make sure Zotero is running with Local API enabled.",
    errorHttp: "Zotero returned HTTP {status}",
    errorJson: "Zotero response is not valid JSON",
    errorTimeout: "Connection to Zotero timed out",
    errorFormat: "Unexpected data format from Zotero",
    settingsTitle: "Zotero Deep Linker",
    settingsApiUrl: "Zotero Local API Address",
    settingsApiUrlDesc: "Usually http://127.0.0.1:23119; enable Local API in Zotero settings.",
    settingsResultLimit: "Search Result Limit",
    settingsResultLimitDesc: "Maximum items per search.",
    settingsColWidth: "Collection Column Min Width",
    settingsColWidthDesc: "Minimum width of the collections sidebar; adjust for long names.",
  },
};

function getLocaleSafe(app: App): "zh" | "en" {
  // Try to get locale from app, fallback to navigator.language
  const vaultConfig = app.vault?.getConfig?.("locale");
  const navLang = (typeof window !== "undefined" ? window.navigator?.language : undefined);
  const locale = vaultConfig ?? navLang ?? "en";
  return locale.startsWith("zh") ? "zh" : "en";
}

let t = I18N.en;

function tr(template: string, vars?: Record<string, string>): string {
  let s = template;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    }
  }
  return s;
}

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
    const request = httpGet(url, (response: import("http").IncomingMessage) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk: string) => { body += chunk; });
      response.on("error", reject);
      response.on("end", () => {
        const status = response.statusCode ?? 0;
        if (status < 200 || status >= 300) {
          reject(new Error(tr(t.errorHttp, { status: String(status) })));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(tr(t.errorJson)));
        }
      });
    });
    request.setTimeout(5_000, () => request.destroy(new Error(tr(t.errorTimeout))));
    request.on("error", reject);
  });
}

function textPreview(value: string | undefined, limit = 100): string {
  const compact = (value ?? "").replace(/\s+/g, " ").trim();
  return compact.length > limit ? `${compact.slice(0, limit)}…` : compact;
}

function pageLabel(data: ZoteroData): string {
  return data.annotationPageLabel
    ? `${t.pageLabelPrefix}${data.annotationPageLabel}${t.pageLabelSuffix}`
    : t.pageUnknown;
}

export default class ZoteroDeepLinkerPlugin extends Plugin {
  settings: ZoteroLinkerSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    t = I18N[getLocaleSafe(this.app)];
    this.addSettingTab(new ZoteroLinkerSettingTab(this.app, this));
    this.addCommand({
      id: "insert-zotero-deep-link",
      name: t.commandName,
      editorCallback: (editor) => new ZoteroSearchModal(this.app, this, (markdown) => editor.replaceSelection(markdown)).open(),
    });
    this.addRibbonIcon("link", t.ribbonTooltip, () => {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!view) {
        new Notice(t.noticeOpenMarkdown);
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
        throw new Error(tr(t.errorFormat));
      }
      return payload as T[];
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(tr(t.errorConnect, { detail }));
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
    this.titleEl.setText(t.modalTitle);
    this.contentEl.createEl("p", { text: t.modalHint });
    const search = new Setting(this.contentEl).setName(t.searchLabel);
    this.input = new TextComponent(search.controlEl);
    this.input.setPlaceholder(t.searchPlaceholder);
    this.input.inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") void this.updateItems();
    });
    search.addButton((button) => button.setButtonText(t.searchBtn).setCta().onClick(() => void this.updateItems()));
    const browser = this.contentEl.createDiv({ cls: "zotero-deep-linker-browser" });
    browser.style.setProperty("--zotero-collection-column-min-width", `${this.plugin.settings.collectionColumnMinWidth}px`);
    this.treeEl = browser.createDiv({ cls: "zotero-deep-linker-collection-tree" });
    this.itemsEl = browser.createDiv({ cls: "zotero-deep-linker-library-items" });
    this.itemsEl.setText(t.loadingCollections);
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
      const libraryRow = this.addCollectionNode(collections, treeEl, undefined, t.libraryRoot, true);
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
    itemsEl.setText(query ? t.searching : t.loadingItems);
    try {
      const items = query ? await this.plugin.search(query) : await this.plugin.getBrowseItems(this.selectedCollectionKey);
      if (this.viewId !== viewId) return;
      itemsEl.empty();
      if (!items.length) {
        itemsEl.setText(query ? t.noResults : t.noItems);
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
      this.addCollectionNode(collections, childrenEl, collection.key, collection.data.name || t.unnamedCollection);
    }
    return row;
  }

  private addItemRow(container: HTMLElement, item: ZoteroItem): void {
    const row = container.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: item.data.title || t.untitledItem });
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
    this.titleEl.setText(t.chooseTargetTitle);
    this.contentEl.createEl("h3", { text: this.item.data.title || t.untitledItem });
    this.addChoice(t.choiceItem, t.choiceItemDesc, () => {
      this.plugin.insert(this.insert, `[${this.item.data.title || "Zotero Item"}](zotero://select/library/items/${this.item.key})`);
      this.close();
    });
    this.addChoice(t.choicePdf, t.choicePdfDesc, () => void this.choosePdf());
  }

  private addChoice(name: string, description: string, action: () => void): void {
    const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: name });
    row.createDiv({ text: description });
    row.addEventListener("click", action);
  }

  private async choosePdf(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.createEl("h3", { text: t.pdfTitle });
    this.contentEl.createDiv({ text: t.pdfLoading });
    try {
      const attachments = await this.plugin.getAttachments(this.item.key);
      this.contentEl.empty();
      this.contentEl.createEl("h3", { text: t.pdfTitle });
      if (!attachments.length) {
        this.contentEl.createDiv({ text: t.pdfNone });
        return;
      }
      for (const attachment of attachments) {
        const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
        row.createEl("strong", { text: attachment.data.filename || "PDF 附件" });
        row.createDiv({ text: t.pdfHint });
        const buttons = row.createDiv({ cls: "zotero-deep-linker-actions" });
        const open = buttons.createEl("button", { text: t.pdfOpenBtn });
        open.addEventListener("click", (event) => {
          event.stopPropagation();
          this.plugin.insert(this.insert, `[${t.pdfOpenBtn.replace("Insert ", "").replace("插入 ", "")}：${attachment.data.filename || this.item.data.title || "Zotero"}](zotero://open-pdf/library/items/${attachment.key})`);
          this.close();
        });
        const annotations = buttons.createEl("button", { text: t.pdfAnnoBtn });
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
    this.contentEl.createEl("h3", { text: t.annoTitle });
    this.contentEl.createDiv({ text: t.annoLoading });
    try {
      const annotations = await this.plugin.getAnnotations(pdf.key);
      this.contentEl.empty();
      this.contentEl.createEl("h3", { text: t.annoTitle });
      if (!annotations.length) {
        this.contentEl.createDiv({ text: t.annoNone });
        return;
      }
      for (const annotation of annotations) {
        const data = annotation.data;
        const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
        const typeLabel = data.annotationType || t.annotationTypeFallback;
        row.createEl("strong", { text: `${pageLabel(data)} · ${typeLabel}` });
        row.createDiv({ text: textPreview(data.annotationComment) || textPreview(data.annotationText) || t.annotationNoText });
        row.addEventListener("click", () => {
          const label = `Zotero ${typeLabel}：${pageLabel(data)}`;
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
    new Setting(this.containerEl).setName(t.settingsTitle).setHeading();
    new Setting(this.containerEl)
      .setName(t.settingsApiUrl)
      .setDesc(t.settingsApiUrlDesc)
      .addText((text) => text.setValue(this.plugin.settings.apiUrl).onChange(async (value) => {
        this.plugin.settings.apiUrl = cleanApiUrl(value);
        await this.plugin.saveSettings();
      }));
    new Setting(this.containerEl)
      .setName(t.settingsResultLimit)
      .setDesc(t.settingsResultLimitDesc)
      .addSlider((slider) => slider.setLimits(10, 100, 10).setValue(this.plugin.settings.resultLimit).onChange(async (value) => {
        this.plugin.settings.resultLimit = value;
        await this.plugin.saveSettings();
      }));
    new Setting(this.containerEl)
      .setName(t.settingsColWidth)
      .setDesc(t.settingsColWidthDesc)
      .addSlider((slider) => slider.setLimits(150, 450, 10).setValue(this.plugin.settings.collectionColumnMinWidth).onChange(async (value) => {
        this.plugin.settings.collectionColumnMinWidth = value;
        await this.plugin.saveSettings();
      }));
  }

  // For Obsidian 1.13.0+ settings search
  getSettingDefinitions(): import("obsidian").SettingTabDefinition[] {
    return [
      {
        settingId: "apiUrl",
        display: {
          type: "text",
          name: t.settingsApiUrl,
          description: t.settingsApiUrlDesc,
        },
        defaultValue: DEFAULT_SETTINGS.apiUrl,
        onChange: async (value: string) => {
          this.plugin.settings.apiUrl = cleanApiUrl(value);
          await this.plugin.saveSettings();
        },
      },
      {
        settingId: "resultLimit",
        display: {
          type: "slider",
          name: t.settingsResultLimit,
          description: t.settingsResultLimitDesc,
        },
        defaultValue: DEFAULT_SETTINGS.resultLimit,
        min: 10,
        max: 100,
        step: 10,
        onChange: async (value: number) => {
          this.plugin.settings.resultLimit = value;
          await this.plugin.saveSettings();
        },
      },
      {
        settingId: "collectionColumnMinWidth",
        display: {
          type: "slider",
          name: t.settingsColWidth,
          description: t.settingsColWidthDesc,
        },
        defaultValue: DEFAULT_SETTINGS.collectionColumnMinWidth,
        min: 150,
        max: 450,
        step: 10,
        onChange: async (value: number) => {
          this.plugin.settings.collectionColumnMinWidth = value;
          await this.plugin.saveSettings();
        },
      },
    ];
  }
}
