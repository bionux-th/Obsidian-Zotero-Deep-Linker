# Zotero Deep Linker for Obsidian

An Obsidian desktop plugin that searches the local Zotero library and inserts
Markdown links to a bibliographic item, a PDF attachment, or one specific PDF
annotation.

## Use

1. Keep Zotero running and enable **Settings → Advanced → API → Enable local API**.
2. In an Obsidian Markdown note, run **Zotero Deep Linker: 添加 Zotero 深链接**
   from the command palette, or use the chain-link ribbon button.
3. Search by title, author, DOI, or keyword, or select a Zotero collection in
   the tree beside the results to browse it directly. Both are available in the
   same window.
4. Choose **文献条目**, or choose a **PDF** and then a concrete **注释**.

The inserted targets have these forms:

```markdown
[Zotero 条目](zotero://select/library/items/ITEM_KEY)
[打开 PDF](zotero://open-pdf/library/items/PDF_KEY)
[定位到 PDF 注释](zotero://open-pdf/library/items/PDF_KEY?page=PAGE&annotation=ANNOTATION_KEY)
```

The plugin never changes Zotero items, PDFs, or annotations. It only reads the
local API and inserts a link into the current Obsidian editor.

## Settings

The default Zotero Local API address is `http://127.0.0.1:23119`. Change it
from **Settings → Community plugins → Zotero Deep Linker** only if your Zotero
setup uses a different local address.

The same settings page includes **文件夹列最小宽度**. Its default is 150 px and it
can be increased when your collection names are longer.

## Development

```bash
npm install
npm run build
```
