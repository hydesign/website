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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
