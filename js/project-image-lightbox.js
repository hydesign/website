/**
 * Project pages: zoom icon on hover, click to open lightbox
 * Works with .project-img-wrap (standalone) and .gallery-slide (project-gallery)
 */
(function () {
  var zoomIcon = '<span class="project-img-zoom" aria-hidden="true">⊕</span>';

  function getLightbox() {
    return document.getElementById('project-lightbox') || document.getElementById('project-drift-lightbox');
  }

  function initLightbox() {
    var lb = getLightbox();
    if (!lb) return null;
    var lbImg = lb.querySelector('img');
    var closeBtn = lb.querySelector('[class*="lightbox-close"]');
    if (!lbImg) return null;

    function open(src) {
      lbImg.src = src;
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target === lbImg) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') close();
    });

    return { open: open };
  }

  function bindWrap(wrap, getSrc) {
    var img = wrap.querySelector('img');
    if (!img) return;
    if (!wrap.querySelector('.project-img-zoom') && !wrap.querySelector('.project-drift-zoom')) {
      wrap.insertAdjacentHTML('beforeend', zoomIcon);
    }
    wrap.style.cursor = 'pointer';
    wrap.classList.add('project-img-wrap');
    wrap.addEventListener('click', function () {
      var src = typeof getSrc === 'function' ? getSrc() : (img.src || img.getAttribute('data-src'));
      if (src && lightboxApi) lightboxApi.open(src);
    });
  }

  function initStandaloneWraps() {
    var selectors = '.project-img-wrap, .project-drift-img-wrap, .project-amphibious-img, .project-phalaenopsis-hero, .phala-cell-img, .project-peach-poster, .project-nomadic-hero';
    document.querySelectorAll(selectors).forEach(function (wrap) {
      if (wrap.dataset.lightboxBound) return;
      var img = wrap.querySelector('img');
      if (!img) return;
      wrap.dataset.lightboxBound = '1';
      bindWrap(wrap);
    });
  }

  function initGalleries() {
    document.querySelectorAll('.project-gallery[data-gallery]').forEach(function (gallery) {
      var slides = gallery.querySelectorAll('.gallery-slide');
      slides.forEach(function (slide) {
        if (slide.dataset.lightboxBound) return;
        slide.dataset.lightboxBound = '1';
        var img = slide.querySelector('img');
        if (!img) return;
        if (!slide.querySelector('.project-img-zoom')) {
          slide.insertAdjacentHTML('beforeend', zoomIcon);
        }
        slide.style.cursor = 'pointer';
        slide.classList.add('project-img-wrap');
        slide.addEventListener('click', function () {
          var src = img.src || img.getAttribute('data-src');
          if (src && lightboxApi) lightboxApi.open(src);
        });
      });
    });
  }

  function observeGalleries() {
    var observer = new MutationObserver(function () {
      initGalleries();
    });
    var container = document.querySelector('main');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  var lightboxApi = initLightbox();
  initStandaloneWraps();
  initGalleries();
  observeGalleries();

  [500, 1500, 3000].forEach(function (ms) {
    setTimeout(function () { initStandaloneWraps(); initGalleries(); }, ms);
  });
})();
