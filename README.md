# aryyuehuang — Ary-Yue Huang 个人网站

艺术家与研究员黄钺的 portfolio 网站，适配 GitHub Pages 托管。

原网站基于 Cargo 制作 ([aryyuehuang.com](https://aryyuehuang.com/))，本版本为静态 HTML/CSS 实现，可在 GitHub 上免费托管。

## 部署到 GitHub Pages

### 方式一：从本仓库根目录发布

1. 在 GitHub 创建新仓库（如 `aryyuehuang.github.io` 或 `website`）
2. **注意**：GitHub 单文件限制 100MB，超大 GIF 已排除（见下方「推送失败」）
3. 将所有文件推送到仓库：

```bash
cd /Users/ary/Documents/new_website
git init
git add .
git commit -m "Initial commit: portfolio site for GitHub Pages"
git branch -M main
git remote add origin https://github.com/hydesign/website.git
git push -u origin main
```

3. 在 GitHub 仓库中：**Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**（或 master）
   - Folder: **/ (root)**
   - 保存后等待几分钟

4. 访问地址：
   - 若仓库名为 `aryyuehuang.github.io`：`https://aryyuehuang.github.io`
   - 否则：`https://你的用户名.github.io/仓库名/`

5. **启用 GitHub Pages**：Settings → Pages → Source 选 "Deploy from a branch" → Branch 选 `main`，根目录 `/`

### 推送失败（HTTP 400 / hung up）

若出现 `RPC failed`、`hung up unexpectedly`，多为仓库含超过 100MB 的文件。已处理的改动：
- `.gitignore` 排除 `images folder/` 和超大 GIF
- `gallery-config.js` 中 nomadic-annotators 暂时仅使用 nomadic-1.jpg、nomadic-3.jpg

在终端执行推送前，可增大 Git 缓冲区：
```bash
git config http.postBuffer 524288000
git push -f origin main
```

### 方式二：使用子目录 /docs

1. 将 `index.html`、`about.html` 等移至 `docs/` 目录
2. 将 `css/` 也放入 `docs/`
3. 在 Pages 设置中将 Folder 选为 **/docs**

## 自定义域名（可选）

若要绑定到 `aryyuehuang.com`：

1. 在项目根目录创建文件 `CNAME`，内容为：`aryyuehuang.com`
2. 在域名服务商处添加 DNS 解析：
   - 类型：`A`，记录：`185.199.108.153`（及同网段其他 IP）
   - 或 类型：`CNAME`，记录：`你的用户名.github.io`

## 本地预览

```bash
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

手机预览（同一 WiFi）：

```bash
./serve-lan.sh
# 或
python3 -m http.server 8080 --bind 0.0.0.0
# 手机访问 http://你的电脑IP:8080
```

## 项目结构

```
.
├── index.html          # 首页（项目列表 + 各项目 gallery）
├── about.html
├── publications.html
├── contact.html
├── 404.html
├── components/
│   ├── header.html     # 导航 + 姓名
│   └── footer.html
├── css/
│   └── style.css       # 全部样式
├── js/
│   ├── include.js      # 加载 header/footer，自动高亮当前页
│   ├── gallery-config.js   # Gallery 图片配置（比例、速度、路径）
│   └── project-gallery.js   # Gallery 轮播、懒加载、滚动淡入
├── images/             # 项目图片（从 images folder 同步）
│   ├── drift-of-the-uncharted/
│   ├── artificial-life-one-leg/
│   ├── return-to-the-peach-blossom-wonderland/
│   └── …（各项目对应子目录）
├── projects/           # 项目详情子页面（无 gallery）
│   ├── drift-of-the-uncharted.html
│   ├── artificial-life-one-leg.html
│   └── …
├── images folder/      # 图片来源（原始素材，同步到 images/ 供网站使用）
├── serve-lan.sh        # 局域网预览脚本
└── README.md
```

---

## 设计

设计相关样式与参数集中在 `css/style.css`，以下为主要入口。

### 1. Header 下方留白

**位置**：`.page-wrapper` 的 `padding-top`（约第 49、59 行）

```css
.page-wrapper {
  padding-top: 13.5rem;   /* 桌面端 */
}
@media (max-width: 640px) {
  .page-wrapper { padding-top: 10.5rem; }  /* 移动端 */
}
```

### 2. 全站基准字号（normal）

**位置**：`html { font-size }`（约第 33 行）

```css
html {
  font-size: 18px;  /* 1rem = 18px */
}
```

### 3. intro-text 字号

**位置**：`.intro-text`（约第 206 行）

```css
.intro-text {
  font-size: 2.05em;  /* 相对 html 基准 ≈ 36.9px */
}
```

### 4. 其他设计变量

- Header 左右缩进：`.site-header` 的 `padding-left` / `padding-right`（约第 70–71 行）
- 内容区宽度：`:root` 中的 `--content-width`、`--max-width`（约第 21–22 行）
- 字体：`:root` 中的 `--font-caption`、`--font-subcaption`、`--font-body`

### 5. 性能与加载

- **Gallery**：仅在进入视口时初始化并加载图片（`project-gallery.js`）
- **图片体积**：部分 GIF 较大（如 nomadic 项目），建议压缩或改用视频
- **脚本加载**：`gallery-config.js` 放在 body 底部，不阻塞首屏渲染

---

©2025 Ary-Yue Huang
