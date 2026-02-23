# aryyuehuang 开发文档

Ary-Yue Huang 个人作品集网站，部署于 GitHub Pages，域名 aryyuehuang.com（腾讯云购买）。

---

## 一、项目结构

```
.
├── index.html              # 主页面（单页应用，含 4 个 section）
├── 404.html                # GitHub Pages 404 fallback，与 index 结构相同，支持 /about、/publications、/contact 干净 URL
├── about.html              # 完整单页副本（无重定向，避免循环）
├── publications.html       # 同上
├── contact.html            # 同上
├── CNAME                   # 自定义域名 aryyuehuang.com
├── favicon.ico             # [可选] 浏览器 favicon，当前未使用
├── ico.png                 # 网站图标 / logo（极简黑白动态人形剪影）
│
├── components/
│   ├── header.html         # 共享导航 + hero 区（姓名、语言切换）
│   └── footer.html         # 共享页脚
│
├── css/
│   ├── style.css           # 主样式表（全站样式）
│   ├── favorit-font-family.css
│   ├── diatype-font-family.css
│   ├── abc-arizona-font.css  # About / Publication 标题字体（ABC Arizona Sans）
│   └── *-font-family/      # 字体资源
│
├── js/
│   ├── include.js          # 加载 header/footer，高亮当前 nav，修复相对路径
│   ├── index.js           # Index 项目列表渲染、intro、语言切换
│   ├── index-data.js       # Index 文案：intro、projects（slug、title、year、tag、media）
│   ├── index-scroll.js     # 单页滚动、About 渲染、pathname 路由（/about、/publications、/contact）
│   ├── cv-data.js          # About 文案：bio、practice、education、exhibition、honors（EN/CH）
│   ├── gallery-config.js   # Gallery 配置：ratio、speed、fit、images 路径
│   ├── project-gallery.js  # Gallery 轮播、懒加载、视口内初始化
│   ├── view-transitions.js # 页面过渡
│   └── project-nav.js      # [已停用] 项目页底部「其他项目」列表
│
├── images/                 # 网站图片（从 images folder 同步，供 gallery 和项目页使用）
│   ├── drift-of-the-uncharted/
│   ├── artificial-life-one-leg/
│   └── …（各项目对应子目录）
│
├── images folder/          # 原始素材（.gitignore，不提交）
│
├── projects/               # 项目详情子页面
│   ├── drift-of-the-uncharted.html
│   ├── artificial-life-one-leg.html
│   └── …
│
├── reference/              # 设计参考、截图等
│
├── scripts/
│   ├── compress-images.sh       # 将 images folder 压缩为 WebP，可选同步到 images/
│   └── update-gallery-to-webp.sh # 批量将 gallery-config.js 中的扩展名改为 .webp
│
├── cv.md                  # CV 原始内容（供维护参考）
├── serve-lan.sh           # 局域网预览（python3 http.server 8080）
└── .gitignore
```

---

## 二、核心架构

### 2.1 URL 与路由

| 访问 URL | 实际行为 |
|----------|----------|
| `/` 或 `/index.html` | 主页面，section 为 project |
| `/about` | 404.html 加载（GitHub Pages），pathname 保持 /about，自动滚动到 About |
| `/publications` | 同上，滚动到 Publications |
| `/contact` | 同上，滚动到 Contact |
| `/about.html` | about.html 加载，pathname 为 /about.html，JS 识别后滚动到 About 并可选 replaceState 为 /about |
| `/projects/xxx.html` | 项目详情页 |

- Nav 链接使用绝对路径：`/`、`/about`、`/publications`、`/contact`
- `index-scroll.js` 中 `pathToSectionId` 支持 `/about`、`/about.html` 等
- `include.js` 中 `getCurrentPage` 用于 nav 高亮

### 2.2 单页 4 Section

`index.html` / `404.html` 包含 4 个 `scroll-section`：

1. **#project** — intro 文案 + 项目列表（gallery + 链接）
2. **#about** — bio、practice、CV（education、exhibition、honors），EN/CH 切换
3. **#publications** — 论文列表
4. **#contact** — Email、Discord、Instagram、WeChat

### 2.3 数据来源

| 内容 | 文件 |
|------|------|
| Index intro、项目列表（slug、title、year、tag、media、quote） | `js/index-data.js` |
| About bio、practice、education、exhibition、honors | `js/cv-data.js` |
| Publications | `index.html` 内嵌 HTML（可后续抽为数据） |
| Contact | `index.html` 内嵌 HTML |
| Gallery 图片路径与配置 | `js/gallery-config.js` |

---

## 三、视觉标识

### Website Logo / Favicon

- **ico.png**：网站主图标，极简黑白动态人形剪影，用于 favicon 和页面引用
- 各页面通过 `<link rel="icon" href="ico.png" type="image/png">` 引用
- 项目子页面使用 `../ico.png`
- 修改品牌或图标时需同步更新 `ico.png`

### favicon.ico

- 当前未使用；如需兼容更多浏览器，可添加 `favicon.ico`，并在 `<head>` 增加对应 link

---

## 四、维护指南

### 4.1 修改文案

| 类型 | 操作 |
|------|------|
| Index intro、项目列表 | 编辑 `js/index-data.js`，注意 `slug` 需与 `projects/xxx.html`、`gallery-config.js` 一致 |
| About bio、practice、CV | 编辑 `js/cv-data.js` |
| Publications | 编辑 `index.html` 中 `#publications` 区块，同步到 `404.html`、`about.html`、`publications.html`、`contact.html` |
| Contact | 同上，`#contact` 区块 |

### 4.2 新增项目

1. 在 `js/index-data.js` 的 `projects` 数组中添加条目：`slug`、`title`、`year`、`tag`、`media`、`quote`（可选）
2. 新建 `projects/<slug>.html`
3. 在 `js/gallery-config.js` 中为该项目的 gallery 添加配置（首页 thumb + 详情页 gallery）
4. 将图片放入 `images/<slug>/`（可从 `images folder/` 用 `scripts/compress-images.sh --sync` 生成 WebP）

### 4.3 图片优化

```bash
# 压缩并同步到 images/
./scripts/compress-images.sh --sync

# 批量将 gallery-config.js 改为使用 .webp
./scripts/update-gallery-to-webp.sh
```

### 4.4 保持多页一致

`index.html`、`404.html`、`about.html`、`publications.html`、`contact.html` 在结构上应保持一致（单页 4 section）。修改主内容时建议同时更新：

- `index.html`（主入口）
- `404.html`（/about、/publications、/contact 入口）
- `about.html`、`publications.html`、`contact.html`（旧链接或部分托管环境会直接加载）

可考虑用脚本或构建流程从 `index.html` 生成其他几个，避免遗漏。

### 4.5 设计参数（css/style.css）

- 全站基准字号：`html { font-size: 18px }`
- Header 下方留白：`.page-wrapper { padding-top }`
- intro 字号：`.intro-text`
- 内容宽度：`:root` 中 `--content-width`、`--max-width`
- About / Publication 标题：`ABC Arizona Sans`，需与 CV、Practice 等保持统一

### 4.6 本地预览

```bash
./serve-lan.sh   # 端口 8080，局域网可访问
```

---

## 五、给新 Agent 的备忘

在接手此项目的新对话中，可提供以下要点：

1. **单页架构**：index / 404 / about / publications / contact 均为同一单页结构，4 个 section 通过 pathname 路由（/about、/publications、/contact），勿再在 about 等页添加重定向，否则会出现循环重定向。

2. **数据与内容**：Index 项目、intro 来自 `index-data.js`；About 文案来自 `cv-data.js`；Publications、Contact 目前写在 HTML 中。

3. **URL**：Nav 使用 `/`、`/about`、`/publications`、`/contact`，不是 `index.html#about`。

4. **ico.png**：网站 logo / favicon，极简黑白人形剪影，任何品牌相关改动都要考虑此文件。

5. **images folder**：原始素材目录，被 `.gitignore`；网站实际用的是 `images/` 中的压缩图。

6. **Gallery**：配置在 `gallery-config.js`，key 为项目 `slug`；`project-gallery.js` 负责轮播和懒加载。

7. **字体**：About、Publication 区块使用 ABC Arizona Sans，与 CV、Practice 标题保持一致。

8. **projects/**：每个项目对应 `projects/<slug>.html`，`slug` 需与 `index-data.js`、`gallery-config.js`、`images/<slug>/` 一致。
