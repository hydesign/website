/**
 * Index 页渲染：从 INDEX_DATA 填充中英文内容，处理语言切换
 */
(function() {
  var data = window.INDEX_DATA;
  if (!data) return;

  var introTextEl = document.getElementById('intro-text');
  var introLinkEl = document.getElementById('intro-link');
  var projectsContainer = document.getElementById('projects-container');
  var lang = 'en';

  function render() {
    var d = data[lang];
    if (!d) return;

    if (introTextEl) introTextEl.innerHTML = d.intro;
    if (introLinkEl) introLinkEl.textContent = d.introLink;

    if (projectsContainer) {
      var base = /\/projects\//.test(window.location.pathname) ? '../' : '';
      projectsContainer.innerHTML = d.projects.map(function(p) {
        var slug = p.slug;
        var href = base + 'projects/' + slug + '.html';
        var quoteHtml = p.quote
          ? '<blockquote class="project-quote">' + p.quote + '</blockquote>'
          : '';
        var item = '<article class="project">' +
          '<div class="project-gallery" data-gallery="' + slug + '" aria-hidden="true"></div>' +
          quoteHtml +
          '<div class="project-info">' +
            '<a href="' + href + '" class="project-title">' + p.title + ' <span class="arrow">↗</span></a>' +
            '<span class="project-year">' + p.year + '</span>' +
          '</div>' +
          '<div class="project-meta"><span class="tag">' + p.tag + '</span> ' + p.media + '</div>' +
        '</article>';
        return item;
      }).join('');

      // 为 gallery 配置 ratio
      window.PAGE_GALLERY_OVERRIDES = window.PAGE_GALLERY_OVERRIDES || {};
      if (window.PAGE_GALLERY_OVERRIDES) {
        d.projects.forEach(function(p) {
          window.PAGE_GALLERY_OVERRIDES[p.slug] = Object.assign(
            window.PAGE_GALLERY_OVERRIDES[p.slug] || {},
            { ratio: '16/9' }
          );
        });
      }
      // 重新初始化 gallery
      if (window.initProjectGalleries) window.initProjectGalleries();
    }

    document.querySelectorAll('.index-lang-btn, .menu-overlay-lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.index-lang-btn, .menu-overlay-lang-btn');
    if (btn) {
      e.preventDefault();
      lang = btn.dataset.lang;
      render();
      document.dispatchEvent(new CustomEvent('siteLangChange', { detail: { lang: lang } }));
    }
  });

  document.addEventListener('siteLangChange', function(e) {
    if (e.detail && e.detail.lang && e.detail.lang !== lang) {
      lang = e.detail.lang;
      render();
    }
  });

  render();
  document.addEventListener('headerLoaded', render);
})();
