/**
 * View Transitions：按 index 项目顺序实现项目间切换的方向性滑动动画
 * 依赖：无（内嵌项目顺序，与 index-data.js 保持一致）
 * 需在 all 页面引入
 */
(function () {
  var PROJECTS_ORDER = [
    'drift-of-the-uncharted',
    'artificial-life-one-leg',
    'return-to-the-peach-blossom-wonderland',
    'buffer-beach-let-the-waves-render',
    'nomadic-annotators',
    'i-just-stay-in-my-home-not-go-anywhere',
    'amphibious-rover-ldn2030-scouting-log',
    'phalaenopsis-and-their-friends-whisper-their-tales',
    'fish-tree-rings-and-memory'
  ];

  function getProjectSlugFromUrl(url) {
    try {
      var u = typeof url === 'string' ? new URL(url, location.origin) : url;
      var path = u.pathname || '';
      var m = path.match(/\/projects\/([^/]+)\.html$/);
      return m ? m[1] : null;
    } catch (e) {
      return null;
    }
  }

  function isIndexPage(url) {
    try {
      var u = typeof url === 'string' ? new URL(url, location.origin) : url;
      var path = (u.pathname || '').replace(/\/+$/, '') || '/';
      return path === '/' || path.endsWith('/index.html') || /^\/[^/]*$/.test(path);
    } catch (e) {
      return false;
    }
  }

  function isProjectPage(url) {
    return getProjectSlugFromUrl(url) !== null;
  }

  function getProjectIndex(slug) {
    var i = PROJECTS_ORDER.indexOf(slug);
    return i >= 0 ? i : -1;
  }

  function determineTransitionType(fromEntry, toEntry) {
    if (!fromEntry || !toEntry) return;
    var fromUrl = fromEntry.url;
    var toUrl = toEntry.url;
    var fromSlug = getProjectSlugFromUrl(fromUrl);
    var toSlug = getProjectSlugFromUrl(toUrl);
    var fromIndex = isIndexPage(fromUrl);
    var toIndex = isIndexPage(toUrl);

    if (fromIndex && isProjectPage(toUrl)) return 'forwards';
    if (isProjectPage(fromUrl) && toIndex) return 'backwards';
    if (fromSlug && toSlug) {
      var fi = getProjectIndex(fromSlug);
      var ti = getProjectIndex(toSlug);
      if (fi >= 0 && ti >= 0) {
        if (ti > fi) return 'forwards';
        if (ti < fi) return 'backwards';
      }
    }
    return undefined;
  }

  function handlePageswap(e) {
    if (!e.viewTransition || !e.activation) return;
    var type = determineTransitionType(e.activation.from, e.activation.entry);
    if (type) e.viewTransition.types.add(type);
  }

  function handlePagereveal(e) {
    if (!e.viewTransition) return;
    var nav = window.navigation;
    if (!nav || !nav.activation) return;
    var type = determineTransitionType(nav.activation.from, nav.activation.entry);
    if (type) e.viewTransition.types.add(type);
  }

  window.addEventListener('pageswap', handlePageswap);
  window.addEventListener('pagereveal', handlePagereveal);
})();
