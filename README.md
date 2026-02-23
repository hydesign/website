# aryyuehuang — Ary-Yue Huang 个人网站

域名在腾讯云购买，部署于 GitHub Pages。网站：<https://aryyuehuang.com>

**开发与维护**：参见 [DEV.md](DEV.md)，包含项目结构、数据来源、维护步骤及给新 Agent 的备忘。

---

## 项目结构（简要）

```
├── index.html          # 主页面（单页，含 project / about / publications / contact）
├── 404.html            # 404 fallback，支持 /about、/publications、/contact 干净 URL
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

- **Gallery**：仅在进入视口时初始化；每张图在即将展示前才加载（渐进加载）
- **脚本加载**：`gallery-config.js` 放在 body 底部，不阻塞首屏渲染

### 6. 图片优化（减轻卡顿）

若加载仍慢，可压缩 `images/` 中的图片：

| 工具 | 用法 |
|------|------|
| [Squoosh](https://squoosh.app) | 网页拖拽上传，导出 WebP 或压缩后的 PNG/JPEG |
| ImageOptim (Mac) | 拖入文件夹批量压缩 |
| `sips` (Mac 内置) | `sips -Z 1200 images/**/*.png` 等比例缩小到 1200px |

建议：Gallery 展示宽度约 800px，原图超过 2000px 可适当缩小；GIF 可考虑转为 MP4 视频（体积更小）。

---

©2025 Ary-Yue Huang
