/**
 * Drift project page: scroll reveal, zoom icon, lightbox
 */
(function () {
  var revealClass = 'project-drift-revealed';

  function initReveal() {
    var wraps = document.querySelectorAll('.project-drift-img-wrap');
    if (!wraps.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(revealClass);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    wraps.forEach(function (w) { io.observe(w); });
  }

  function initLightbox() {
    var lb = document.getElementById('project-drift-lightbox');
    var lbImg = lb && lb.querySelector('img');
    var closeBtn = lb && lb.querySelector('.project-drift-lightbox-close');
    if (!lb || !lbImg) return;

    function open(src) {
      lbImg.src = src;
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.project-drift-img-wrap').forEach(function (wrap) {
      var img = wrap.querySelector('img');
      if (!img || !img.src) return;
      wrap.style.cursor = 'pointer';
      wrap.addEventListener('click', function () {
        open(img.src);
      });
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
    document.addEventListener('DOMContentLoaded', function () {
      initReveal();
      initLightbox();
    });
  } else {
    initReveal();
    initLightbox();
  }
})();
