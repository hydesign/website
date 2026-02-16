/**
 * Project Gallery 配置
 *
 * 配置项：
 *   ratio   - 宽高比，如 '16/9', '4/3'
 *   speed   - 每张图显示秒数
 *   fit     - 图片适配方式：
 *             'cover' (默认) 填满容器，可能裁剪
 *             'contain' 完整显示，宽度或高度对齐容器，另一边等比例缩放（可能有留白）
 *   images  - 图片路径数组
 */
window.PROJECT_GALLERIES = {
  'drift-of-the-uncharted': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/drift-of-the-uncharted/DOU-1.png',
      'images/drift-of-the-uncharted/DOU-2.png',
      'images/drift-of-the-uncharted/DOU-3.png'
    ]
  },
  'artificial-life-one-leg': {
    ratio: '4/3',
    speed: 4,
    images: [
      'images/artificial-life-one-leg/1leg-1.png',
      'images/artificial-life-one-leg/1leg-2.png',
      'images/artificial-life-one-leg/1leg-3.png',
      'images/artificial-life-one-leg/1leg-4.png'
    ]
  },
  'return-to-the-peach-blossom-wonderland': {
    ratio: '16/9',
    speed: 6,
    fit: 'contain',  /* 宽图：宽度对齐 gallery，高度等比例缩小 */
    images: [
      'images/return-to-the-peach-blossom-wonderland/cover.jpg',
      'images/return-to-the-peach-blossom-wonderland/return-1.gif'
    ]
  },
  'buffer-beach-let-the-waves-render': {
    ratio: '16/9',
    speed: 5,
    fit: 'contain',  /* 高图：高度对齐 gallery，宽度等比例缩小 */
    images: [
      'images/buffer-beach-let-the-waves-render/sf2-1.png',
      'images/buffer-beach-let-the-waves-render/sf2-2.png',
      'images/buffer-beach-let-the-waves-render/sf2-3.png',
      'images/buffer-beach-let-the-waves-render/sf2-4.png'
    ]
  },
  'nomadic-annotators': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/nomadic-annotators/nomadic-1.jpg',
      'images/nomadic-annotators/nomadic-3.jpg'
    ]
  },
  'i-just-stay-in-my-home-not-go-anywhere': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/i-just-stay-in-my-home-not-go-anywhere/notgoanywhere-1.gif',
      'images/i-just-stay-in-my-home-not-go-anywhere/notgoanywhere-2.jpeg'
    ]
  },
  'phalaenopsis-and-their-friends-whisper-their-tales': {
    ratio: '16/9',
    speed: 6,
    images: [
      'images/phalaenopsis-and-their-friends-whisper-their-tales/兰花.gif'
    ]
  },
  'amphibious-rover-ldn2030-scouting-log': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/amphibious-rover-ldn2030-scouting-log/amphibious-1.png'
    ]
  },
  'fish-tree-rings-and-memory': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/fish-tree-rings-and-memory/fish-1.png',
      'images/fish-tree-rings-and-memory/fish-2.png'
    ]
  }
};
