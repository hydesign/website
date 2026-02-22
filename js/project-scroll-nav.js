/**
 * Project 页面：上下滑动/滚轮在边界时切换上一个/下一个项目
 * 保持独立 HTML 页面，按 index 顺序导航
 * 依赖 INDEX_DATA (index-data.js)
 */
(function () {
  if (!window.INDEX_DATA) return;
  var path = window.location.pathname || '';
  if (!path.includes('/projects/') && !path.includes('projects/')) return;

  var slugMatch = path.match(/\/([^/]+)\.html$/);
  var currentSlug = slugMatch ? slugMatch[1] : '';
  if (!currentSlug) return;

  var lang = (document.documentElement.lang === 'zh-CN' || document.documentElement.lang === 'zh') ? 'zh' : 'en';
  var data = window.INDEX_DATA[lang] || window.INDEX_DATA.en;
  var projects = (data && data.projects) || [];
  var slugs = projects.map(function (p) { return p.slug; });
  var base = /\/projects\//.test(path) ? '../' : '';

  var idx = slugs.indexOf(currentSlug);
  if (idx < 0) return;

  var prevSlug = idx > 0 ? slugs[idx - 1] : null;
  var nextSlug = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  var BOUNDARY = 80;
  var COOLDOWN = 600;
  var lastNav = 0;

  function atTop() {
    var st = document.documentElement.scrollTop || document.body.scrollTop;
    return st <= BOUNDARY;
  }

  function atBottom() {
    var st = document.documentElement.scrollTop || document.body.scrollTop;
    var sh = document.documentElement.scrollHeight;
    var ch = window.innerHeight;
    return st + ch >= sh - BOUNDARY;
  }

  function navigate(href) {
    if (Date.now() - lastNav < COOLDOWN) return;
    lastNav = Date.now();
    window.location.href = href;
  }

  function tryNext() {
    if (nextSlug && atBottom()) {
      navigate(base + 'projects/' + nextSlug + '.html');
      return true;
    }
    return false;
  }

  function tryPrev() {
    if (prevSlug && atTop()) {
      navigate(base + 'projects/' + prevSlug + '.html');
      return true;
    }
    return false;
  }

  // 滚轮
  window.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
      if (tryNext()) e.preventDefault();
    } else if (e.deltaY < 0) {
      if (tryPrev()) e.preventDefault();
    }
  }, { passive: false });

  // 触屏：边界处上下滑
  var touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    var dy = touchStartY - e.changedTouches[0].clientY;
    var threshold = 100;
    if (dy > threshold && atBottom() && tryNext()) { /* 底部上滑 → 下一页 */ }
    else if (dy < -threshold && atTop() && tryPrev()) { /* 顶部下滑 → 上一页 */ }
  }, { passive: true });

  // 键盘上下键
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' && tryNext()) e.preventDefault();
    else if (e.key === 'ArrowUp' && tryPrev()) e.preventDefault();
  });
})();
