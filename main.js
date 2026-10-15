"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ZoteroDeepLinkerPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_http = require("http");
var import_https = require("https");
var I18N = {
  zh: {
    commandName: "\u6DFB\u52A0 Zotero \u6DF1\u94FE\u63A5",
    ribbonTooltip: "\u6DFB\u52A0 Zotero \u6DF1\u94FE\u63A5",
    modalTitle: "\u6DFB\u52A0 Zotero \u6DF1\u94FE\u63A5",
    modalHint: "\u641C\u7D22\u6587\u732E\uFF0C\u6216\u4ECE\u5DE6\u4FA7\u6536\u85CF\u5939\u76F4\u63A5\u9009\u62E9\uFF1B\u968F\u540E\u9009\u62E9\u8981\u94FE\u63A5\u7684\u4F4D\u7F6E\u3002",
    searchLabel: "\u641C\u7D22 Zotero \u6587\u732E",
    searchPlaceholder: "\u4F8B\u5982\uFF1ADNA-CMG-Pol epsilon \u6216 10.1038/\u2026",
    searchBtn: "\u641C\u7D22",
    loadingCollections: "\u6B63\u5728\u8BFB\u53D6 Zotero \u6536\u85CF\u5939\u2026",
    loadingItems: "\u6B63\u5728\u8BFB\u53D6\u6587\u732E\u2026",
    searching: "\u6B63\u5728\u641C\u7D22 Zotero\u2026",
    noResults: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u6587\u732E\u3002",
    noItems: "\u8FD9\u4E2A\u4F4D\u7F6E\u6CA1\u6709\u53EF\u9009\u62E9\u7684\u6587\u732E\u6761\u76EE\u3002",
    libraryRoot: "\u6211\u7684\u6587\u5E93",
    unnamedCollection: "\u672A\u547D\u540D\u6536\u85CF\u5939",
    untitledItem: "\u65E0\u9898\u540D\u6761\u76EE",
    chooseTargetTitle: "\u9009\u62E9 Zotero \u94FE\u63A5\u5BF9\u8C61",
    choiceItem: "\u6587\u732E\u6761\u76EE",
    choiceItemDesc: "\u5728 Zotero \u4E2D\u9009\u4E2D\u8BE5\u6587\u732E\u3002",
    choicePdf: "\u9009\u62E9 PDF \u6216 PDF \u6CE8\u91CA",
    choicePdfDesc: "\u7EE7\u7EED\u9009\u62E9\u9644\u4EF6\uFF0C\u6216\u5B9A\u4F4D\u5230\u67D0\u6761\u9AD8\u4EAE\u3001\u6279\u6CE8\u6216\u56FE\u7247\u6CE8\u91CA\u3002",
    pdfTitle: "\u9009\u62E9 PDF \u9644\u4EF6",
    pdfLoading: "\u6B63\u5728\u8BFB\u53D6\u9644\u4EF6\u2026",
    pdfNone: "\u6B64\u6587\u732E\u6CA1\u6709\u53EF\u8BC6\u522B\u7684 PDF \u9644\u4EF6\u3002",
    pdfOpenBtn: "\u63D2\u5165 PDF \u94FE\u63A5",
    pdfAnnoBtn: "\u9009\u62E9\u6CE8\u91CA",
    pdfHint: "\u70B9\u51FB\u76F4\u63A5\u6253\u5F00 PDF\uFF1B\u4F7F\u7528\u201C\u6CE8\u91CA\u201D\u5B9A\u4F4D\u5230\u5177\u4F53\u6807\u8BB0\u3002",
    annoTitle: "\u9009\u62E9 PDF \u6CE8\u91CA",
    annoLoading: "\u6B63\u5728\u8BFB\u53D6 Zotero \u6CE8\u91CA\u2026",
    annoNone: "\u8FD9\u4E2A PDF \u6682\u65E0 Zotero \u6CE8\u91CA\u3002",
    pageLabelPrefix: "\u7B2C ",
    pageLabelSuffix: " \u9875",
    pageUnknown: "\u672A\u8BB0\u5F55\u9875\u7801",
    annotationTypeFallback: "\u6CE8\u91CA",
    annotationNoText: "\u65E0\u6587\u5B57\u5185\u5BB9\uFF08\u53EF\u80FD\u662F\u56FE\u7247\u6216\u7B14\u8FF9\u6CE8\u91CA\uFF09",
    pdfFallback: "PDF \u9644\u4EF6",
    annotationLinkText: "{title}\uFF08{page}\uFF09",
    choiceNote: "\u7B14\u8BB0",
    choiceNoteDesc: "\u94FE\u63A5\u5230\u8BE5\u6761\u76EE\u7684\u5B50\u7B14\u8BB0\u3002",
    noteTitle: "\u9009\u62E9\u7B14\u8BB0",
    noteLoading: "\u6B63\u5728\u8BFB\u53D6 Zotero \u7B14\u8BB0\u2026",
    noteNone: "\u6B64\u6761\u76EE\u6682\u65E0\u5B50\u7B14\u8BB0\u3002",
    noteLinkText: "{title} - \u7B14\u8BB0 {index}",
    typePdf: "PDF \u9644\u4EF6",
    typeNote: "\u7B14\u8BB0",
    typeAttachment: "\u9644\u4EF6",
    choicePdfCounts: "{pdfs} \u4E2A PDF \xB7 {annotations} \u6761\u6CE8\u91CA",
    choiceNoteCounts: "{notes} \u6761\u5B50\u7B14\u8BB0",
    choicePdfSelf: "PDF / \u6CE8\u91CA",
    choicePdfSelfDesc: "\u6253\u5F00\u8BE5 PDF\uFF0C\u6216\u5B9A\u4F4D\u5230\u67D0\u6761\u6CE8\u91CA\u3002",
    noteEmpty: "\uFF08\u7A7A\u767D\u7B14\u8BB0\uFF09",
    noticeInserted: "\u5DF2\u63D2\u5165 Zotero \u94FE\u63A5\u3002",
    noticeOpenMarkdown: "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A Markdown \u7B14\u8BB0\uFF0C\u4EE5\u4FBF\u63D2\u5165\u94FE\u63A5\u3002",
    errorConnect: "\u65E0\u6CD5\u8FDE\u63A5 Zotero Local API\uFF08{detail}\uFF09\u3002\u8BF7\u786E\u8BA4 Zotero \u6B63\u5728\u8FD0\u884C\u5E76\u5DF2\u542F\u7528\u672C\u5730 API\u3002",
    errorHttp: "Zotero \u8FD4\u56DE HTTP {status}",
    errorJson: "Zotero \u8FD4\u56DE\u7684\u4E0D\u662F\u6709\u6548 JSON",
    errorTimeout: "\u8FDE\u63A5 Zotero \u8D85\u65F6",
    errorFormat: "Zotero \u8FD4\u56DE\u4E86\u610F\u5916\u7684\u6570\u636E\u683C\u5F0F",
    settingsTitle: "Zotero Deep Linker",
    settingsApiUrl: "Zotero Local API \u5730\u5740",
    settingsApiUrlDesc: "\u901A\u5E38\u4E3A http://127.0.0.1:23119\uFF1B\u9700\u5728 Zotero \u8BBE\u7F6E\u4E2D\u542F\u7528\u672C\u5730 API\u3002",
    settingsResultLimit: "\u641C\u7D22\u7ED3\u679C\u6570\u91CF",
    settingsResultLimitDesc: "\u6BCF\u6B21\u641C\u7D22\u6700\u591A\u663E\u793A\u7684 Zotero \u6587\u732E\u6570\u91CF\u3002",
    settingsColWidth: "\u6587\u4EF6\u5939\u5217\u6700\u5C0F\u5BBD\u5EA6",
    settingsColWidthDesc: "\u6D4F\u89C8\u5668\u5DE6\u4FA7\u6536\u85CF\u5939\u5217\u7684\u6700\u5C0F\u5BBD\u5EA6\uFF1B\u53EF\u6839\u636E\u6587\u4EF6\u5939\u540D\u79F0\u957F\u5EA6\u8C03\u6574\u3002"
  },
  en: {
    commandName: "Add Zotero Deep Link",
    ribbonTooltip: "Add Zotero Deep Link",
    modalTitle: "Add Zotero Deep Link",
    modalHint: "Search literature or pick from collections, then choose link target.",
    searchLabel: "Search Zotero",
    searchPlaceholder: "e.g. DNA-CMG-Pol epsilon or 10.1038/\u2026",
    searchBtn: "Search",
    loadingCollections: "Loading Zotero collections\u2026",
    loadingItems: "Loading items\u2026",
    searching: "Searching Zotero\u2026",
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
    pdfLoading: "Loading attachments\u2026",
    pdfNone: "No recognizable PDF attachment for this item.",
    pdfOpenBtn: "Insert PDF Link",
    pdfAnnoBtn: "Choose Annotation",
    pdfHint: "Click to open PDF; use \u201CAnnotation\u201D to locate a specific mark.",
    annoTitle: "Choose PDF Annotation",
    annoLoading: "Loading annotations\u2026",
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
    noteLoading: "Loading Zotero notes\u2026",
    noteNone: "This item has no child notes.",
    noteLinkText: "{title} - Note {index}",
    typePdf: "PDF attachment",
    typeNote: "Note",
    typeAttachment: "Attachment",
    choicePdfCounts: "{pdfs} PDF \xB7 {annotations} annotations",
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
    settingsColWidthDesc: "Minimum width of the collections sidebar; adjust for long names."
  }
};
function getLocaleSafe(app) {
  const vault = app.vault;
  const vaultConfig = vault.getConfig?.("locale");
  const storedLang = typeof window !== "undefined" ? window.localStorage?.getItem("language") : void 0;
  const navLang = typeof window !== "undefined" ? window.navigator?.language : void 0;
  const locale = vaultConfig ?? storedLang ?? navLang ?? "en";
  return String(locale).startsWith("zh") ? "zh" : "en";
}
var t = I18N.en;
function tr(template, vars) {
  if (!vars) return template;
  return template.replace(
    /\{(\w+)\}/g,
    (match, key) => Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match
  );
}
var DEFAULT_SETTINGS = {
  apiUrl: "http://127.0.0.1:23119",
  resultLimit: 30,
  collectionColumnMinWidth: 150
};
function cleanApiUrl(url) {
  return url.replace(/\/+$/, "").replace(/\/api$/i, "");
}
async function getLocalJson(url) {
  return new Promise((resolve, reject) => {
    const onResponse = (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
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
    const request = url.startsWith("https:") ? (0, import_https.get)(url, onResponse) : (0, import_http.get)(url, onResponse);
    request.setTimeout(5e3, () => request.destroy(new Error(tr(t.errorTimeout))));
    request.on("error", reject);
  });
}
function textPreview(value, limit = 100) {
  const compact = (value ?? "").replace(/\s+/g, " ").trim();
  return compact.length > limit ? `${compact.slice(0, limit)}\u2026` : compact;
}
function htmlToText(html) {
  return (html ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#0?39;/g, "'");
}
function cleanTitle(value) {
  return htmlToText(value).replace(/\s+/g, " ").trim();
}
function notePreviewText(data, limit = 80) {
  return textPreview(htmlToText(data.note), limit);
}
function isPdfAttachment(data) {
  return data.itemType === "attachment" && /pdf/i.test(data.filename ?? data.title ?? "");
}
function entryKind(data) {
  if (data.itemType === "note") return "note";
  if (data.itemType === "attachment") return isPdfAttachment(data) ? "pdf" : "attachment";
  return "item";
}
var ROW_ICONS = {
  item: "book-open",
  pdf: "file-text",
  note: "sticky-note",
  attachment: "paperclip"
};
function itemTitle(data) {
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
function isListableEntry(data) {
  return !data.parentItem && data.itemType !== "annotation";
}
function markdownLink(label, url) {
  const text = label.replace(/\s+/g, " ").trim() || url;
  return `[${text}](${url})`;
}
function pageLabel(data) {
  return data.annotationPageLabel ? `${t.pageLabelPrefix}${data.annotationPageLabel}${t.pageLabelSuffix}` : t.pageUnknown;
}
var ZoteroDeepLinkerPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings", DEFAULT_SETTINGS);
  }
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    t = I18N[getLocaleSafe(this.app)];
    this.addSettingTab(new ZoteroLinkerSettingTab(this.app, this));
    this.addCommand({
      id: "insert-zotero-deep-link",
      name: t.commandName,
      editorCallback: (editor) => this.openSearch(editor)
    });
    this.addRibbonIcon("link", t.ribbonTooltip, () => {
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (!view) {
        new import_obsidian.Notice(t.noticeOpenMarkdown);
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
  openSearch(editor) {
    const selection = editor.getSelection().replace(/\s+/g, " ").trim();
    new ZoteroSearchModal(this.app, this, (label, url) => {
      editor.replaceSelection(markdownLink(selection || label, url));
    }).open();
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async getItems(path, params = {}) {
    return this.getRecords(path, params);
  }
  async getRecords(path, params = {}) {
    const query = new URLSearchParams({ format: "json", include: "data", ...params });
    const url = `${cleanApiUrl(this.settings.apiUrl)}${path}?${query.toString()}`;
    try {
      const payload = await getLocalJson(url);
      if (!Array.isArray(payload)) {
        throw new Error(tr(t.errorFormat));
      }
      return payload;
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(tr(t.errorConnect, { detail }));
    }
  }
  /** Walk every page of a list endpoint instead of silently truncating at 100. */
  async getAllRecords(path, params = {}) {
    const pageSize = 100;
    const all = [];
    for (let start = 0; ; start += pageSize) {
      const page = await this.getRecords(path, { ...params, limit: String(pageSize), start: String(start) });
      all.push(...page);
      if (page.length < pageSize) break;
    }
    return all;
  }
  async search(query) {
    const items = await this.getItems("/api/users/0/items", {
      q: query,
      limit: String(this.settings.resultLimit)
    });
    return items.filter((item) => isListableEntry(item.data));
  }
  async getCollections() {
    return this.getAllRecords("/api/users/0/collections");
  }
  async getBrowseItems(collectionKey) {
    const path = collectionKey ? `/api/users/0/collections/${encodeURIComponent(collectionKey)}/items/top` : "/api/users/0/items/top";
    const items = await this.getAllRecords(path, { sort: "title", direction: "asc" });
    return items.filter((item) => isListableEntry(item.data));
  }
  async getAttachments(itemKey) {
    const children = await this.getAllRecords(`/api/users/0/items/${encodeURIComponent(itemKey)}/children`);
    return children.filter((item) => isPdfAttachment(item.data));
  }
  /**
   * Counts shown under the picker's choices. A single `?itemKey=` query
   * returns the whole subtree: the item itself, its attachments and notes, and
   * the annotations nested under those attachments.
   */
  async getChildSummary(itemKey) {
    const items = await this.getAllRecords("/api/users/0/items", { itemKey });
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
  async getAnnotations(pdfKey) {
    const items = await this.getAllRecords("/api/users/0/items", { itemKey: pdfKey });
    return items.filter((item) => item.data.itemType === "annotation" && item.data.parentItem === pdfKey);
  }
  async getNotes(itemKey) {
    const children = await this.getAllRecords(`/api/users/0/items/${encodeURIComponent(itemKey)}/children`);
    return children.filter((item) => item.data.itemType === "note");
  }
  insert(insert, label, url) {
    insert(label, url);
    new import_obsidian.Notice(t.noticeInserted);
  }
};
var ZoteroSearchModal = class extends import_obsidian.Modal {
  constructor(app, plugin, insert) {
    super(app);
    this.plugin = plugin;
    this.insert = insert;
    __publicField(this, "input");
    __publicField(this, "itemsEl");
    __publicField(this, "treeEl");
    __publicField(this, "selectedRow");
    __publicField(this, "selectedCollectionKey");
    __publicField(this, "viewId", 0);
  }
  onOpen() {
    this.modalEl.addClass("zotero-deep-linker-modal");
    this.titleEl.setText(t.modalTitle);
    this.contentEl.createEl("p", { text: t.modalHint });
    const search = new import_obsidian.Setting(this.contentEl).setName(t.searchLabel);
    this.input = new import_obsidian.TextComponent(search.controlEl);
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
  async loadCollections() {
    const viewId = ++this.viewId;
    const treeEl = this.treeEl;
    const itemsEl = this.itemsEl;
    if (!treeEl || !itemsEl) return;
    try {
      const collections = await this.plugin.getCollections();
      if (this.viewId !== viewId) return;
      const libraryRow = this.addCollectionNode(collections, treeEl, void 0, t.libraryRoot, true);
      libraryRow.classList.add("is-active");
      this.selectedRow = libraryRow;
      await this.updateItems();
    } catch (error) {
      if (this.viewId === viewId) itemsEl.setText(error instanceof Error ? error.message : String(error));
    }
  }
  async updateItems() {
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
  addCollectionNode(collections, container, parentKey, name, expanded = false) {
    const node = container.createDiv({ cls: "zotero-deep-linker-tree-node" });
    const row = node.createDiv({ cls: "zotero-deep-linker-library-row is-clickable" });
    const children = collections.filter((collection) => (collection.data.parentCollection || void 0) === parentKey).sort((a, b) => (a.data.name || "").localeCompare(b.data.name || "", "zh-CN"));
    const toggle = row.createEl("button", { cls: "zotero-deep-linker-tree-toggle", text: children.length ? expanded ? "\u25BE" : "\u25B8" : "" });
    toggle.disabled = !children.length;
    row.createSpan({ cls: "zotero-deep-linker-collection-name", text: name });
    const childrenEl = node.createDiv({ cls: "zotero-deep-linker-tree-children" });
    childrenEl.toggleClass("is-collapsed", !expanded);
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const collapsed = childrenEl.classList.toggle("is-collapsed");
      toggle.setText(collapsed ? "\u25B8" : "\u25BE");
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
  addItemRow(container, item) {
    const kind = entryKind(item.data);
    const row = container.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    const head = row.createSpan({ cls: "zotero-deep-linker-row-head" });
    const icon = head.createSpan({ cls: "zotero-deep-linker-row-icon" });
    (0, import_obsidian.setIcon)(icon, ROW_ICONS[kind]);
    if (kind !== "item") {
      const typeLabel = kind === "note" ? t.typeNote : kind === "pdf" ? t.typePdf : t.typeAttachment;
      icon.setAttribute("aria-label", typeLabel);
      icon.setAttribute("title", typeLabel);
    }
    head.createEl("strong", { text: itemTitle(item.data) });
    row.createDiv({ text: this.metaLine(item.data, kind) });
    row.addEventListener("click", () => this.openTarget(item, kind));
  }
  metaLine(data, kind) {
    switch (kind) {
      case "note":
        return t.typeNote;
      case "pdf":
        return t.typePdf;
      case "attachment":
        return t.typeAttachment;
      default:
        return [data.firstCreator, data.date, data.publicationTitle].filter(Boolean).join(" \xB7 ");
    }
  }
  openTarget(item, kind) {
    this.close();
    if (kind === "note") {
      this.plugin.insert(this.insert, itemTitle(item.data), `zotero://select/library/items/${item.key}`);
      return;
    }
    new ZoteroTargetModal(this.app, this.plugin, item, this.insert).open();
  }
};
var ZoteroTargetModal = class extends import_obsidian.Modal {
  constructor(app, plugin, item, insert) {
    super(app);
    this.plugin = plugin;
    this.item = item;
    this.insert = insert;
    __publicField(this, "pdfDescEl");
    __publicField(this, "noteDescEl");
  }
  onOpen() {
    this.titleEl.setText(t.chooseTargetTitle);
    this.contentEl.createEl("h3", { text: itemTitle(this.item.data) });
    if (this.item.data.itemType !== "attachment") {
      this.addChoice(t.choiceItem, t.choiceItemDesc, () => {
        this.plugin.insert(this.insert, itemTitle(this.item.data), `zotero://select/library/items/${this.item.key}`);
        this.close();
      });
    }
    const pdfChoice = this.item.data.itemType === "attachment" ? { name: t.choicePdfSelf, desc: t.choicePdfSelfDesc } : { name: t.choicePdf, desc: t.choicePdfDesc };
    this.pdfDescEl = this.addChoice(pdfChoice.name, pdfChoice.desc, () => void this.choosePdf());
    this.noteDescEl = this.addChoice(t.choiceNote, t.choiceNoteDesc, () => void this.chooseNote());
    void this.loadCounts();
  }
  /** Replaces the choice subtitles with live subtree counts once they load. */
  async loadCounts() {
    try {
      const summary = await this.plugin.getChildSummary(this.item.key);
      this.pdfDescEl?.setText(tr(t.choicePdfCounts, {
        pdfs: String(summary.pdfs),
        annotations: String(summary.annotations)
      }));
      this.noteDescEl?.setText(tr(t.choiceNoteCounts, { notes: String(summary.notes) }));
    } catch {
    }
  }
  addChoice(name, description, action) {
    const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: name });
    const desc = row.createDiv({ text: description });
    row.addEventListener("click", action);
    return desc;
  }
  async choosePdf() {
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
          const label = selfIsAttachment ? itemTitle(attachment.data) : cleanTitle(this.item.data.title) || cleanTitle(attachment.data.filename) || t.pdfFallback;
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
  async chooseAnnotation(pdf) {
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
        row.createEl("strong", { text: `${pageLabel(data)} \xB7 ${typeLabel}` });
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
  async chooseNote() {
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
};
var ZoteroLinkerSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    new import_obsidian.Setting(this.containerEl).setName(t.settingsTitle).setHeading();
    new import_obsidian.Setting(this.containerEl).setName(t.settingsApiUrl).setDesc(t.settingsApiUrlDesc).addText((text) => text.setValue(this.plugin.settings.apiUrl).onChange(async (value) => {
      this.plugin.settings.apiUrl = cleanApiUrl(value);
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(this.containerEl).setName(t.settingsResultLimit).setDesc(t.settingsResultLimitDesc).addSlider((slider) => slider.setLimits(10, 100, 10).setValue(this.plugin.settings.resultLimit).onChange(async (value) => {
      this.plugin.settings.resultLimit = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(this.containerEl).setName(t.settingsColWidth).setDesc(t.settingsColWidthDesc).addSlider((slider) => slider.setLimits(150, 450, 10).setValue(this.plugin.settings.collectionColumnMinWidth).onChange(async (value) => {
      this.plugin.settings.collectionColumnMinWidth = value;
      await this.plugin.saveSettings();
    }));
  }
  // Obsidian 1.13.0+ renders this tab declaratively (and indexes it for the
  // settings search) when this returns a NON-EMPTY array, in which case the
  // deprecated display() above is skipped entirely. Returning an empty array
  // keeps display() as the renderer on older versions.
  getSettingDefinitions() {
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
              placeholder: DEFAULT_SETTINGS.apiUrl
            }
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
              defaultValue: DEFAULT_SETTINGS.resultLimit
            }
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
              defaultValue: DEFAULT_SETTINGS.collectionColumnMinWidth
            }
          }
        ]
      }
    ];
  }
  // The declarative controls read/write through these hooks. Point them at the
  // plugin's own settings store and keep the API URL normalized on write.
  getControlValue(key) {
    return this.plugin.settings[key];
  }
  async setControlValue(key, value) {
    const next = key === "apiUrl" && typeof value === "string" ? cleanApiUrl(value) : value;
    this.plugin.settings[key] = next;
    await this.plugin.saveSettings();
  }
};
