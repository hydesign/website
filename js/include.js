/**
 * 加载共享 header 和 footer
 * 根据当前页面自动高亮对应导航项
 */
(function () {
  let base = document.querySelector('script[data-base]')?.dataset?.base || '';
  if (!base && /\/projects\//.test(window.location.pathname)) {
    base = '../';
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    if (file === 'index.html' || file === '' || path.endsWith('/')) return 'projects';
    if (file === 'about.html') return 'about';
    if (file === 'publications.html') return 'publications';
    if (file === 'contact.html') return 'contact';
    if (path.includes('/projects/')) return 'projects';
    return '';
  }

  function setActiveLink(container) {
    const page = getCurrentPage();
    if (!page) return;
    container.querySelectorAll('.nav-link[data-page]').forEach(function (a) {
      a.classList.toggle('active', a.dataset.page === page);
    });
  }

  function fixRelativeLinks(container, basePath) {
    if (!basePath) return;
    container.querySelectorAll('a[href]').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
        a.setAttribute('href', basePath + href);
      }
    });
  }

  // 加载 header
  const headerEl = document.getElementById('header-placeholder');
  if (headerEl) {
    fetch(base + 'components/header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        headerEl.outerHTML = html;
        const header = document.querySelector('.site-header');
        if (header) {
          setActiveLink(header);
          fixRelativeLinks(header, base);
          document.dispatchEvent(new CustomEvent('headerLoaded'));
        }
      })
      .catch(function () {
        headerEl.outerHTML = '<header class="site-header"><nav class="nav"><a href="index.html" class="nav-link">PROJECTS</a><a href="about.html" class="nav-link">ABOUT</a><a href="publications.html" class="nav-link">PUBLICATIONS</a><a href="contact.html" class="nav-link">CONTACT</a></nav><div class="hero"><h1 class="hero-title">ARY-YUE HUANG</h1><h2 class="hero-subtitle">黄 钺</h2></div></header>';
      });
  }

  // 加载 footer
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) {
    fetch(base + 'components/footer.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        footerEl.outerHTML = html;
      })
      .catch(function () {
        footerEl.outerHTML = '<footer class="footer">©2025 Ary-Yue Huang</footer>';
      });
  }
})();
