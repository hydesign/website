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
      'images/drift-of-the-uncharted/DOU-1.webp',
      'images/drift-of-the-uncharted/DOU-2.webp',
      'images/drift-of-the-uncharted/DOU-3.webp'
    ]
  },
  'drift-of-the-uncharted-hero': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/drift-of-the-uncharted/DOU-4.jpg',
      'images/drift-of-the-uncharted/DOU-1.webp'
    ]
  },
  'artificial-life-one-leg': {
    ratio: '4/3',
    speed: 4,
    images: [
      'images/artificial-life-one-leg/1leg-1.webp',
      'images/artificial-life-one-leg/1leg-2.webp',
      'images/artificial-life-one-leg/1leg-3.webp',
      'images/artificial-life-one-leg/1leg-4.webp'
    ]
  },
  'artificial-life-one-leg-top': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/artificial-life-one-leg/1leg-5.jpg',
      'images/artificial-life-one-leg/1leg-2.png'
    ]
  },
  'artificial-life-one-leg-body': {
    ratio: '16/9',
    speed: 5,
    fit: 'contain',
    images: [
      'images/artificial-life-one-leg/GIF3.gif',
      'images/artificial-life-one-leg/1leg-1.png',
      'images/artificial-life-one-leg/1leg-6.jpg',
      'images/artificial-life-one-leg/1leg-7.jpg',
      'images/artificial-life-one-leg/1leg-8.jpg'
    ]
  },
  'artificial-life-one-leg-bottom': {
    ratio: '4/3',
    speed: 5,
    images: [
      'images/artificial-life-one-leg/1leg-4-1.webp',
      'images/artificial-life-one-leg/1leg-3-1.webp'
    ]
  },
  'return-to-the-peach-blossom-wonderland': {
    ratio: '16/9',
    speed: 6,
    fit: 'contain',
    images: [
      'images/return-to-the-peach-blossom-wonderland/cover.webp',
      'images/return-to-the-peach-blossom-wonderland/return-1.gif'
    ]
  },
  'return-to-the-peach-blossom-wonderland-body': {
    ratio: '16/9',
    speed: 6,
    fit: 'contain',
    images: [
      'images/return-to-the-peach-blossom-wonderland/return-2.png',
      'images/return-to-the-peach-blossom-wonderland/return-3.png',
      'images/return-to-the-peach-blossom-wonderland/return-4.jpg',
      'images/return-to-the-peach-blossom-wonderland/return-1.gif'
    ]
  },
  'buffer-beach-let-the-waves-render': {
    ratio: '16/9',
    speed: 5,
    fit: 'contain',
    images: [
      'images/buffer-beach-let-the-waves-render/sf2-1.webp',
      'images/buffer-beach-let-the-waves-render/sf2-2.webp',
      'images/buffer-beach-let-the-waves-render/sf2-3.webp',
      'images/buffer-beach-let-the-waves-render/sf2-4.webp'
    ]
  },
  'buffer-beach-let-the-waves-render-body': {
    ratio: '9/16',
    speed: 5,
    fit: 'contain',
    images: [
      'images/buffer-beach-let-the-waves-render/sf2-5.webp',
      'images/buffer-beach-let-the-waves-render/sf2-6.webp',
      'images/buffer-beach-let-the-waves-render/sf2-7.webp'
    ]
  },
  'nomadic-annotators': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/nomadic-annotators/nomadic-1.webp',
      'images/nomadic-annotators/nomadic-3.webp'
    ]
  },
  'nomadic-annotators-body': {
    ratio: '16/9',
    speed: 5,
    fit: 'contain',
    images: [
      'images/nomadic-annotators/nomadic-2.webp',
      'images/nomadic-annotators/nomadic-4.webp',
      'images/nomadic-annotators/nomadic-5.webp',
      'images/nomadic-annotators/nomadic-6.webp',
      'images/nomadic-annotators/nomadic-7.webp',
      'images/nomadic-annotators/nomadic-8.webp',
      'images/nomadic-annotators/nomadic-9.webp'
    ]
  },
  'nomadic-annotators-bottom': {
    ratio: '16/9',
    speed: 5,
    fit: 'contain',
    images: [
      'images/nomadic-annotators/nomadic-10.webp',
      'images/nomadic-annotators/nomadic-11.webp',
      'images/nomadic-annotators/nomadic-12.webp',
      'images/nomadic-annotators/nomadic-13.webp'
    ]
  },
  'i-just-stay-in-my-home-not-go-anywhere': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/i-just-stay-in-my-home-not-go-anywhere/notgoanywhere-1.webp',
      'images/i-just-stay-in-my-home-not-go-anywhere/notgoanywhere-2.webp'
    ]
  },
  'phalaenopsis-and-their-friends-whisper-their-tales': {
    ratio: '16/9',
    speed: 6,
    images: [
      'images/phalaenopsis-and-their-friends-whisper-their-tales/兰花.webp'
    ]
  },
  'amphibious-rover-ldn2030-scouting-log': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/amphibious-rover-ldn2030-scouting-log/amphibious-1.webp'
    ]
  },
  'fish-tree-rings-and-memory': {
    ratio: '16/9',
    speed: 5,
    images: [
      'images/fish-tree-rings-and-memory/fish-1.webp',
      'images/fish-tree-rings-and-memory/fish-2.webp'
    ]
  }
};
