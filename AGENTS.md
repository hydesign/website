# 给新 Agent 的快速参考

在新对话中可用 `@AGENTS.md` 引用此文件，或复制以下内容作为上下文。

---

## 项目概况

- **项目**：aryyuehuang 个人作品集网站
- **托管**：GitHub Pages，域名 aryyuehuang.com（腾讯云）
- **技术**：静态 HTML/CSS/JS，无构建工具

## 必须记住的要点

1. **单页架构**：`index.html`、`404.html`、`about.html`、`publications.html`、`contact.html` 均为同一单页，含 4 个 section（#project、#about、#publications、#contact）。**切勿**在 about 等页添加 `window.location.replace('/about')` 类重定向，否则会导致重定向循环。

2. **URL 设计**：导航使用 `/`、`/about`、`/publications`、`/contact`，不是 `index.html#about`。访问 `/about` 时由 GitHub Pages 返回 404，加载 `404.html`，pathname 保持 `/about`。

3. **内容数据**：
   - Index intro、项目列表 → `js/index-data.js`
   - About bio、practice、CV（education、exhibition、honors）→ `js/cv-data.js`
   - Publications、Contact → 写在 HTML 中

4. **ico.png**：网站 logo / favicon，极简黑白人形剪影。品牌或图标相关改动需考虑此文件。

5. **images folder**：原始素材目录，`.gitignore` 不提交。网站实际图片在 `images/`，由 `scripts/compress-images.sh --sync` 从 images folder 压缩后同步。

6. **Gallery**：配置在 `js/gallery-config.js`，key 为项目 slug；`js/project-gallery.js` 负责轮播与懒加载。

7. **新增项目**：需同步修改 `index-data.js`、新建 `projects/<slug>.html`、在 `gallery-config.js` 添加配置、在 `images/<slug>/` 放入图片。

8. **字体**：About、Publication 标题使用 ABC Arizona Sans，与 CV、Practice 保持一致。

9. **多页同步**：修改主内容时，需同步更新 `index.html`、`404.html`、`about.html`、`publications.html`、`contact.html`。

---

完整开发文档见 [DEV.md](DEV.md)。
