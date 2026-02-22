/**
 * Project 子页面：底部插入其他项目列表，顺序与 index 一致
 * 依赖 INDEX_DATA (index-data.js)
 */
(function () {
  if (!window.INDEX_DATA) return;
  var path = window.location.pathname || '';
  if (!path.includes('/projects/') && !path.includes('projects/')) return;

  var slugMatch = path.match(/\/([^/]+)\.html$/);
  var currentSlug = slugMatch ? slugMatch[1] : '';
  if (!currentSlug) return;

  var base = /\/projects\//.test(path) ? '../' : '';
  var lang = (document.documentElement.lang === 'zh-CN' || document.documentElement.lang === 'zh') ? 'zh' : 'en';
  var data = window.INDEX_DATA[lang] || window.INDEX_DATA.en;
  var projects = data.projects || [];

  var html = '<section class="project-nav">' +
    '<h2 class="project-nav-title">' + (lang === 'zh' ? '其他项目' : 'Other Projects') + '</h2>' +
    '<nav class="project-nav-list">' +
    projects.map(function (p) {
      var href = base + 'projects/' + p.slug + '.html';
      var current = p.slug === currentSlug ? ' project-nav-item-current' : '';
      return '<a href="' + href + '" class="project-nav-item' + current + '">' +
        '<span class="project-nav-item-title">' + p.title + '</span> ' +
        '<span class="project-nav-item-year">' + p.year + '</span> ' +
        '<span class="project-nav-arrow">↗</span></a>';
    }).join('') +
    '</nav>' +
    '<a href="' + base + 'index.html" class="project-nav-back">← ' + (lang === 'zh' ? '返回项目列表' : 'Back to Projects') + '</a>' +
    '</section>';

  var footer = document.getElementById('footer-placeholder');
  if (footer) {
    var wrap = document.createElement('div');
    wrap.className = 'project-nav-wrapper';
    wrap.innerHTML = html;
    footer.parentNode.insertBefore(wrap, footer);
  }
})();
