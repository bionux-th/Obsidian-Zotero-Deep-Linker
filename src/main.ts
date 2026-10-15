import {
  App,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  setIcon,
  TextComponent,
} from "obsidian";
import type { Editor, SettingDefinitionItem } from "obsidian";
import { get as httpGet } from "http";
import { get as httpsGet } from "https";

/**
 * Zotero Deep Linker for Obsidian
 * Copyright (c) 2024 Local
 *
 * MIT License - see LICENSE file for details
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
    pdfFallback: "PDF 附件",
    annotationLinkText: "{title}（{page}）",
    choiceNote: "笔记",
    choiceNoteDesc: "链接到该条目的子笔记。",
    noteTitle: "选择笔记",
    noteLoading: "正在读取 Zotero 笔记…",
    noteNone: "此条目暂无子笔记。",
    noteLinkText: "{title} - 笔记 {index}",
    typePdf: "PDF 附件",
    typeNote: "笔记",
    typeAttachment: "附件",
    choicePdfCounts: "{pdfs} 个 PDF · {annotations} 条注释",
    choiceNoteCounts: "{notes} 条子笔记",
    choicePdfSelf: "PDF / 注释",
    choicePdfSelfDesc: "打开该 PDF，或定位到某条注释。",
    noteEmpty: "（空白笔记）",
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
    pdfFallback: "PDF Attachment",
    annotationLinkText: "{title} ({page})",
    choiceNote: "Note",
    choiceNoteDesc: "Link to a child note of this item.",
    noteTitle: "Choose Note",
    noteLoading: "Loading Zotero notes…",
    noteNone: "This item has no child notes.",
    noteLinkText: "{title} - Note {index}",
    typePdf: "PDF attachment",
    typeNote: "Note",
    typeAttachment: "Attachment",
    choicePdfCounts: "{pdfs} PDF · {annotations} annotations",
    choiceNoteCounts: "{notes} notes",
    choicePdfSelf: "PDF / Annotation",
    choicePdfSelfDesc: "Open this PDF or locate a specific annotation.",
    noteEmpty: "(empty note)",
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
  // `Vault.getConfig` is a real (but untyped) Obsidian API; localStorage
  // `language` is the value Obsidian writes for its own UI language.
  const vault = app.vault as unknown as { getConfig?: (key: string) => unknown };
  const vaultConfig = vault.getConfig?.("locale");
  const storedLang = typeof window !== "undefined" ? window.localStorage?.getItem("language") : undefined;
  const navLang = (typeof window !== "undefined" ? window.navigator?.language : undefined);
  const locale = vaultConfig ?? storedLang ?? navLang ?? "en";
  return String(locale).startsWith("zh") ? "zh" : "en";
}

let t = I18N.en;

function tr(template: string, vars?: Record<string, string>): string {
  if (!vars) return template;
  // Function replacement avoids `$&`-style special patterns in values and any
  // regex characters leaking out of the placeholder name.
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match,
  );
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
  note?: string;
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

/**
 * Receives a resolved link label and its target URL. The install site decides
 * the final Markdown (e.g. substituting the editor's current selection).
 */
type InsertLinkFn = (label: string, url: string) => void;

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
    const onResponse = (response: import("http").IncomingMessage): void => {
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
    };
    // Support an https Zotero address (e.g. a remote instance) as well as the
    // usual http://127.0.0.1:23119.
    const request = url.startsWith("https:")
      ? httpsGet(url, onResponse)
      : httpGet(url, onResponse);
    request.setTimeout(5_000, () => request.destroy(new Error(tr(t.errorTimeout))));
    request.on("error", reject);
  });
}

function textPreview(value: string | undefined, limit = 100): string {
  const compact = (value ?? "").replace(/\s+/g, " ").trim();
  return compact.length > limit ? `${compact.slice(0, limit)}…` : compact;
}

/** Zotero stores note bodies as HTML; reduce one to readable plain text. */
function htmlToText(html: string | undefined): string {
  return (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/g, "'");
}

/** Zotero title/filename fields may contain inline HTML (e.g. `<i>`). */
function cleanTitle(value: string | undefined): string {
  return htmlToText(value).replace(/\s+/g, " ").trim();
}

/** Note items carry no title; derive one from the note body. */
function notePreviewText(data: ZoteroData, limit = 80): string {
  return textPreview(htmlToText(data.note), limit);
}

type EntryKind = "item" | "pdf" | "note" | "attachment";

function isPdfAttachment(data: ZoteroData): boolean {
  return data.itemType === "attachment" && /pdf/i.test(data.filename ?? data.title ?? "");
}

function entryKind(data: ZoteroData): EntryKind {
  if (data.itemType === "note") return "note";
  if (data.itemType === "attachment") return isPdfAttachment(data) ? "pdf" : "attachment";
  return "item";
}

/** Lucide icons used in the result list so PDFs/notes are told apart at a glance. */
const ROW_ICONS: Record<EntryKind, string> = {
  item: "book-open",
  pdf: "file-text",
  note: "sticky-note",
  attachment: "paperclip",
};

/** Default link text for an entry: its title, a filename, or a note preview. */
function itemTitle(data: ZoteroData): string {
  switch (entryKind(data)) {
    case "note":
      return notePreviewText(data) || t.noteEmpty;
    case "item":
      return cleanTitle(data.title) || t.untitledItem;
    case "pdf":
      return cleanTitle(data.filename) || cleanTitle(data.title) || t.pdfFallback;
    default:
      return cleanTitle(data.filename) || cleanTitle(data.title) || t.typeAttachment;
  }
}

/**
 * Only top-level entries are listable: regular items plus standalone notes and
 * attachments. Child items and annotations are reached through their parent's
 * link targets instead.
 */
function isListableEntry(data: ZoteroData): boolean {
  return !data.parentItem && data.itemType !== "annotation";
}

/** Build the Markdown link. A blank/whitespace label falls back to the URL. */
function markdownLink(label: string, url: string): string {
  const text = label.replace(/\s+/g, " ").trim() || url;
  return `[${text}](${url})`;
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
      editorCallback: (editor) => this.openSearch(editor),
    });
    this.addRibbonIcon("link", t.ribbonTooltip, () => {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!view) {
        new Notice(t.noticeOpenMarkdown);
        return;
      }
      this.openSearch(view.editor);
    });
  }

  /**
   * Opens the picker and inserts the chosen link at the cursor. Text selected
   * before opening the picker becomes the link's display text, overriding the
   * default label.
   */
  private openSearch(editor: Editor): void {
    const selection = editor.getSelection().replace(/\s+/g, " ").trim();
    new ZoteroSearchModal(this.app, this, (label, url) => {
      editor.replaceSelection(markdownLink(selection || label, url));
    }).open();
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

  /** Walk every page of a list endpoint instead of silently truncating at 100. */
  private async getAllRecords<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
    const pageSize = 100;
    const all: T[] = [];
    for (let start = 0; ; start += pageSize) {
      const page = await this.getRecords<T>(path, { ...params, limit: String(pageSize), start: String(start) });
      all.push(...page);
      if (page.length < pageSize) break;
    }
    return all;
  }

  async search(query: string): Promise<ZoteroItem[]> {
    const items = await this.getItems("/api/users/0/items", {
      q: query,
      limit: String(this.settings.resultLimit),
    });
    return items.filter((item) => isListableEntry(item.data));
  }

  async getCollections(): Promise<ZoteroCollection[]> {
    return this.getAllRecords<ZoteroCollection>("/api/users/0/collections");
  }

  async getBrowseItems(collectionKey?: string): Promise<ZoteroItem[]> {
    const path = collectionKey
      ? `/api/users/0/collections/${encodeURIComponent(collectionKey)}/items/top`
      : "/api/users/0/items/top";
    const items = await this.getAllRecords<ZoteroItem>(path, { sort: "title", direction: "asc" });
    return items.filter((item) => isListableEntry(item.data));
  }

  async getAttachments(itemKey: string): Promise<ZoteroItem[]> {
    const children = await this.getAllRecords<ZoteroItem>(`/api/users/0/items/${encodeURIComponent(itemKey)}/children`);
    return children.filter((item) => isPdfAttachment(item.data));
  }

  /**
   * Counts shown under the picker's choices. A single `?itemKey=` query
   * returns the whole subtree: the item itself, its attachments and notes, and
   * the annotations nested under those attachments.
   */
  async getChildSummary(itemKey: string): Promise<{ pdfs: number; annotations: number; notes: number }> {
    const items = await this.getAllRecords<ZoteroItem>("/api/users/0/items", { itemKey });
    const summary = { pdfs: 0, annotations: 0, notes: 0 };
    for (const item of items) {
      switch (item.data.itemType) {
        case "annotation":
          summary.annotations++;
          break;
        case "note":
          summary.notes++;
          break;
        default:
          if (isPdfAttachment(item.data)) summary.pdfs++;
          break;
      }
    }
    return summary;
  }

  async getAnnotations(pdfKey: string): Promise<ZoteroItem[]> {
    // The local API does not expose annotations through `/items/{key}/children`,
    // but `?itemKey=` returns the item together with its child annotations.
    const items = await this.getAllRecords<ZoteroItem>("/api/users/0/items", { itemKey: pdfKey });
    return items.filter((item) => item.data.itemType === "annotation" && item.data.parentItem === pdfKey);
  }

  async getNotes(itemKey: string): Promise<ZoteroItem[]> {
    // Note items have no `title`; their body lives in `data.note` as HTML.
    const children = await this.getAllRecords<ZoteroItem>(`/api/users/0/items/${encodeURIComponent(itemKey)}/children`);
    return children.filter((item) => item.data.itemType === "note");
  }

  insert(insert: InsertLinkFn, label: string, url: string): void {
    insert(label, url);
    new Notice(t.noticeInserted);
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
    private readonly insert: InsertLinkFn,
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
    const kind = entryKind(item.data);
    const row = container.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    // A <span> wrapper keeps this out of the `.row > div` meta styling.
    const head = row.createSpan({ cls: "zotero-deep-linker-row-head" });
    const icon = head.createSpan({ cls: "zotero-deep-linker-row-icon" });
    setIcon(icon, ROW_ICONS[kind]);
    if (kind !== "item") {
      const typeLabel = kind === "note" ? t.typeNote : kind === "pdf" ? t.typePdf : t.typeAttachment;
      icon.setAttribute("aria-label", typeLabel);
      icon.setAttribute("title", typeLabel);
    }
    head.createEl("strong", { text: itemTitle(item.data) });
    row.createDiv({ text: this.metaLine(item.data, kind) });
    row.addEventListener("click", () => this.openTarget(item, kind));
  }

  private metaLine(data: ZoteroData, kind: EntryKind): string {
    switch (kind) {
      case "note": return t.typeNote;
      case "pdf": return t.typePdf;
      case "attachment": return t.typeAttachment;
      default: return [data.firstCreator, data.date, data.publicationTitle].filter(Boolean).join(" · ");
    }
  }

  private openTarget(item: ZoteroItem, kind: EntryKind): void {
    this.close();
    // A standalone note has nothing to drill into, so link it straight away.
    if (kind === "note") {
      this.plugin.insert(this.insert, itemTitle(item.data), `zotero://select/library/items/${item.key}`);
      return;
    }
    new ZoteroTargetModal(this.app, this.plugin, item, this.insert).open();
  }
}

class ZoteroTargetModal extends Modal {
  private pdfDescEl?: HTMLElement;
  private noteDescEl?: HTMLElement;

  constructor(
    app: App,
    private readonly plugin: ZoteroDeepLinkerPlugin,
    private readonly item: ZoteroItem,
    private readonly insert: InsertLinkFn,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText(t.chooseTargetTitle);
    this.contentEl.createEl("h3", { text: itemTitle(this.item.data) });

    // A standalone attachment has no parent item to select, so it offers its
    // own PDF/annotation targets instead of an "Item" choice.
    if (this.item.data.itemType !== "attachment") {
      this.addChoice(t.choiceItem, t.choiceItemDesc, () => {
        this.plugin.insert(this.insert, itemTitle(this.item.data), `zotero://select/library/items/${this.item.key}`);
        this.close();
      });
    }
    const pdfChoice = this.item.data.itemType === "attachment"
      ? { name: t.choicePdfSelf, desc: t.choicePdfSelfDesc }
      : { name: t.choicePdf, desc: t.choicePdfDesc };
    this.pdfDescEl = this.addChoice(pdfChoice.name, pdfChoice.desc, () => void this.choosePdf());
    this.noteDescEl = this.addChoice(t.choiceNote, t.choiceNoteDesc, () => void this.chooseNote());
    void this.loadCounts();
  }

  /** Replaces the choice subtitles with live subtree counts once they load. */
  private async loadCounts(): Promise<void> {
    try {
      const summary = await this.plugin.getChildSummary(this.item.key);
      this.pdfDescEl?.setText(tr(t.choicePdfCounts, {
        pdfs: String(summary.pdfs),
        annotations: String(summary.annotations),
      }));
      this.noteDescEl?.setText(tr(t.choiceNoteCounts, { notes: String(summary.notes) }));
    } catch {
      // Keep the descriptive fallback text when the API is unreachable.
    }
  }

  private addChoice(name: string, description: string, action: () => void): HTMLElement {
    const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: name });
    const desc = row.createDiv({ text: description });
    row.addEventListener("click", action);
    return desc;
  }

  private async choosePdf(): Promise<void> {
    const selfIsAttachment = this.item.data.itemType === "attachment";
    this.contentEl.empty();
    this.contentEl.createEl("h3", { text: t.pdfTitle });
    this.contentEl.createDiv({ text: t.pdfLoading });
    try {
      const attachments = selfIsAttachment ? [this.item] : await this.plugin.getAttachments(this.item.key);
      this.contentEl.empty();
      this.contentEl.createEl("h3", { text: t.pdfTitle });
      if (!attachments.length) {
        this.contentEl.createDiv({ text: t.pdfNone });
        return;
      }
      for (const attachment of attachments) {
        const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
        row.createEl("strong", { text: cleanTitle(attachment.data.filename) || itemTitle(attachment.data) });
        row.createDiv({ text: t.pdfHint });
        const buttons = row.createDiv({ cls: "zotero-deep-linker-actions" });
        const open = buttons.createEl("button", { text: t.pdfOpenBtn });
        open.addEventListener("click", (event) => {
          event.stopPropagation();
          // Default display text is the entry's title, per the plugin's convention.
          const label = selfIsAttachment
            ? itemTitle(attachment.data)
            : cleanTitle(this.item.data.title) || cleanTitle(attachment.data.filename) || t.pdfFallback;
          this.plugin.insert(this.insert, label, `zotero://open-pdf/library/items/${attachment.key}`);
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
          const title = itemTitle(this.item.data);
          const label = data.annotationPageLabel ? tr(t.annotationLinkText, { title, page: pageLabel(data) }) : title;
          const params = new URLSearchParams({ annotation: annotation.key });
          if (data.annotationPageLabel) params.set("page", data.annotationPageLabel);
          this.plugin.insert(this.insert, label, `zotero://open-pdf/library/items/${pdf.key}?${params.toString()}`);
          this.close();
        });
      }
    } catch (error) {
      this.contentEl.setText(error instanceof Error ? error.message : String(error));
    }
  }

  private async chooseNote(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.createEl("h3", { text: t.noteTitle });
    this.contentEl.createDiv({ text: t.noteLoading });
    try {
      const notes = await this.plugin.getNotes(this.item.key);
      this.contentEl.empty();
      this.contentEl.createEl("h3", { text: t.noteTitle });
      if (!notes.length) {
        this.contentEl.createDiv({ text: t.noteNone });
        return;
      }
      // Note items carry no title; label them by parent title + running index.
      const title = itemTitle(this.item.data);
      notes.forEach((note, index) => {
        const label = tr(t.noteLinkText, { title, index: String(index + 1) });
        const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
        row.createEl("strong", { text: label });
        row.createDiv({ text: notePreviewText(note.data, 140) || t.noteEmpty });
        row.addEventListener("click", () => {
          this.plugin.insert(this.insert, label, `zotero://select/library/items/${note.key}`);
          this.close();
        });
      });
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

  // Obsidian 1.13.0+ renders this tab declaratively (and indexes it for the
  // settings search) when this returns a NON-EMPTY array, in which case the
  // deprecated display() above is skipped entirely. Returning an empty array
  // keeps display() as the renderer on older versions.
  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        type: "group",
        heading: t.settingsTitle,
        items: [
          {
            name: t.settingsApiUrl,
            desc: t.settingsApiUrlDesc,
            control: {
              type: "text",
              key: "apiUrl",
              defaultValue: DEFAULT_SETTINGS.apiUrl,
              placeholder: DEFAULT_SETTINGS.apiUrl,
            },
          },
          {
            name: t.settingsResultLimit,
            desc: t.settingsResultLimitDesc,
            control: {
              type: "slider",
              key: "resultLimit",
              min: 10,
              max: 100,
              step: 10,
              defaultValue: DEFAULT_SETTINGS.resultLimit,
            },
          },
          {
            name: t.settingsColWidth,
            desc: t.settingsColWidthDesc,
            control: {
              type: "slider",
              key: "collectionColumnMinWidth",
              min: 150,
              max: 450,
              step: 10,
              defaultValue: DEFAULT_SETTINGS.collectionColumnMinWidth,
            },
          },
        ],
      },
    ];
  }

  // The declarative controls read/write through these hooks. Point them at the
  // plugin's own settings store and keep the API URL normalized on write.
  getControlValue(key: string): unknown {
    return (this.plugin.settings as unknown as Record<string, unknown>)[key];
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    const next = key === "apiUrl" && typeof value === "string" ? cleanApiUrl(value) : value;
    (this.plugin.settings as unknown as Record<string, unknown>)[key] = next;
    await this.plugin.saveSettings();
  }
}
