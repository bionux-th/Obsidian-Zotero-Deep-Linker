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
  const vaultConfig = app.vault?.getConfig?.("locale");
  const navLang = typeof window !== "undefined" ? window.navigator?.language : void 0;
  const locale = vaultConfig ?? navLang ?? "en";
  return locale.startsWith("zh") ? "zh" : "en";
}
var t = I18N.en;
function tr(template, vars) {
  let s = template;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    }
  }
  return s;
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
    const request = (0, import_http.get)(url, (response) => {
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
    });
    request.setTimeout(5e3, () => request.destroy(new Error(tr(t.errorTimeout))));
    request.on("error", reject);
  });
}
function textPreview(value, limit = 100) {
  const compact = (value ?? "").replace(/\s+/g, " ").trim();
  return compact.length > limit ? `${compact.slice(0, limit)}\u2026` : compact;
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
      editorCallback: (editor) => new ZoteroSearchModal(this.app, this, (markdown) => editor.replaceSelection(markdown)).open()
    });
    this.addRibbonIcon("link", t.ribbonTooltip, () => {
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (!view) {
        new import_obsidian.Notice(t.noticeOpenMarkdown);
        return;
      }
      new ZoteroSearchModal(this.app, this, (markdown) => view.editor.replaceSelection(markdown)).open();
    });
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
  async search(query) {
    const items = await this.getItems("/api/users/0/items", {
      q: query,
      limit: String(this.settings.resultLimit)
    });
    return items.filter((item) => !["attachment", "note", "annotation"].includes(item.data.itemType ?? ""));
  }
  async getCollections() {
    return this.getRecords("/api/users/0/collections", { limit: "100" });
  }
  async getBrowseItems(collectionKey) {
    const path = collectionKey ? `/api/users/0/collections/${encodeURIComponent(collectionKey)}/items/top` : "/api/users/0/items/top";
    const pageSize = 100;
    const allItems = [];
    for (let start = 0; ; start += pageSize) {
      const page = await this.getItems(path, {
        limit: String(pageSize),
        start: String(start),
        sort: "title",
        direction: "asc"
      });
      allItems.push(...page);
      if (page.length < pageSize) break;
    }
    return allItems.filter((item) => !["attachment", "note", "annotation"].includes(item.data.itemType ?? ""));
  }
  async getAttachments(itemKey) {
    const children = await this.getItems(`/api/users/0/items/${itemKey}/children`, { limit: "100" });
    return children.filter((item) => item.data.itemType === "attachment" && /pdf/i.test(item.data.filename ?? item.data.title ?? ""));
  }
  async getAnnotations(pdfKey) {
    const items = await this.getItems("/api/users/0/items", { itemKey: pdfKey, limit: "100" });
    return items.filter((item) => item.data.itemType === "annotation" && item.data.parentItem === pdfKey);
  }
  insert(callback, markdown) {
    callback(markdown);
    new import_obsidian.Notice("\u5DF2\u63D2\u5165 Zotero \u94FE\u63A5\u3002");
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
    const row = container.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: item.data.title || t.untitledItem });
    row.createDiv({ text: [item.data.firstCreator, item.data.date, item.data.publicationTitle].filter(Boolean).join(" \xB7 ") });
    row.addEventListener("click", () => {
      this.close();
      new ZoteroTargetModal(this.app, this.plugin, item, this.insert).open();
    });
  }
};
var ZoteroTargetModal = class extends import_obsidian.Modal {
  constructor(app, plugin, item, insert) {
    super(app);
    this.plugin = plugin;
    this.item = item;
    this.insert = insert;
  }
  onOpen() {
    this.titleEl.setText(t.chooseTargetTitle);
    this.contentEl.createEl("h3", { text: this.item.data.title || t.untitledItem });
    this.addChoice(t.choiceItem, t.choiceItemDesc, () => {
      this.plugin.insert(this.insert, `[${this.item.data.title || "Zotero Item"}](zotero://select/library/items/${this.item.key})`);
      this.close();
    });
    this.addChoice(t.choicePdf, t.choicePdfDesc, () => void this.choosePdf());
  }
  addChoice(name, description, action) {
    const row = this.contentEl.createDiv({ cls: "zotero-deep-linker-row is-clickable" });
    row.createEl("strong", { text: name });
    row.createDiv({ text: description });
    row.addEventListener("click", action);
  }
  async choosePdf() {
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
        row.createEl("strong", { text: attachment.data.filename || "PDF \u9644\u4EF6" });
        row.createDiv({ text: t.pdfHint });
        const buttons = row.createDiv({ cls: "zotero-deep-linker-actions" });
        const open = buttons.createEl("button", { text: t.pdfOpenBtn });
        open.addEventListener("click", (event) => {
          event.stopPropagation();
          this.plugin.insert(this.insert, `[${t.pdfOpenBtn.replace("Insert ", "").replace("\u63D2\u5165 ", "")}\uFF1A${attachment.data.filename || this.item.data.title || "Zotero"}](zotero://open-pdf/library/items/${attachment.key})`);
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
          const label = `Zotero ${typeLabel}\uFF1A${pageLabel(data)}`;
          this.plugin.insert(this.insert, `[${label}](zotero://open-pdf/library/items/${pdf.key}?page=${encodeURIComponent(data.annotationPageLabel || "")}&annotation=${annotation.key})`);
          this.close();
        });
      }
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
  // For Obsidian 1.13.0+ settings search
  getSettingDefinitions() {
    return [
      {
        settingId: "apiUrl",
        display: {
          type: "text",
          name: t.settingsApiUrl,
          description: t.settingsApiUrlDesc
        },
        defaultValue: DEFAULT_SETTINGS.apiUrl,
        onChange: async (value) => {
          this.plugin.settings.apiUrl = cleanApiUrl(value);
          await this.plugin.saveSettings();
        }
      },
      {
        settingId: "resultLimit",
        display: {
          type: "slider",
          name: t.settingsResultLimit,
          description: t.settingsResultLimitDesc
        },
        defaultValue: DEFAULT_SETTINGS.resultLimit,
        min: 10,
        max: 100,
        step: 10,
        onChange: async (value) => {
          this.plugin.settings.resultLimit = value;
          await this.plugin.saveSettings();
        }
      },
      {
        settingId: "collectionColumnMinWidth",
        display: {
          type: "slider",
          name: t.settingsColWidth,
          description: t.settingsColWidthDesc
        },
        defaultValue: DEFAULT_SETTINGS.collectionColumnMinWidth,
        min: 150,
        max: 450,
        step: 10,
        onChange: async (value) => {
          this.plugin.settings.collectionColumnMinWidth = value;
          await this.plugin.saveSettings();
        }
      }
    ];
  }
};
