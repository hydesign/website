/**
 * Project pages: zoom icon on hover, click to open lightbox for any image
 * Works with: .project-img-wrap, .project-drift-img-wrap, .gallery-slide
 */
(function () {
  var lbId = 'project-lightbox';
  var lbIdLegacy = 'project-drift-lightbox';

  function getLightbox() {
    return document.getElementById(lbId) || document.getElementById(lbIdLegacy);
  }

  function ensureLightbox() {
    var lb = getLightbox();
    if (lb) return lb;
    var div = document.createElement('div');
    div.id = lbId;
    div.className = 'project-lightbox';
    div.setAttribute('aria-hidden', 'true');
    div.innerHTML = '<button type="button" class="project-lightbox-close" aria-label="Close">×</button><img src="" alt="">';
    document.body.appendChild(div);
    return div;
  }

  function init() {
    var lb = ensureLightbox();
    var lbImg = lb.querySelector('img');
    var closeBtn = lb.querySelector('.project-lightbox-close');
    if (!lbImg) return;

    function open(src) {
      if (!src) return;
      lbImg.src = src;
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var wrap = e.target.closest('.project-img-wrap, .project-drift-img-wrap');
      var slide = e.target.closest('.gallery-slide');
      var img = wrap ? wrap.querySelector('img') : (slide ? slide.querySelector('img') : null);
      if (img && img.src) {
        e.preventDefault();
        open(img.src);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target === lbImg) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
