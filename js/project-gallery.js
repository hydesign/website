/**
 * Project Gallery - 延迟初始化：仅当 gallery 进入视口时才加载图片，减轻首屏压力
 */
(function () {
  const base = /\/projects\//.test(window.location.pathname) ? '../' : '';
  const arrowPrevSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  const arrowNextSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

  function initOneGallery(el) {
    if (el.dataset.galleryInited === '1') return;
    var key = el.dataset.gallery;
    var config = window.PROJECT_GALLERIES && window.PROJECT_GALLERIES[key];
    if (!config || !config.images || config.images.length === 0) return;

    el.dataset.galleryInited = '1';

    var ratio = (config.ratio || '16/9').split('/').map(Number);
    var speed = (config.speed || 5) * 1000;
    var imgStyle = config.fit === 'contain' ? ' style="object-fit:contain;object-position:center"' : '';

    el.style.aspectRatio = ratio[0] + ' / ' + ratio[1];

    if (config.images.length === 1) {
      var src = config.images[0].startsWith('http') ? config.images[0] : base + config.images[0];
      el.innerHTML = '<div class="gallery-slide active"><img src="' + src + '" alt="" loading="lazy"' + imgStyle + '></div>';
      if (config.fit === 'contain') el.classList.add('gallery-fit-contain');
      return;
    }

    var slidesHtml = config.images.map(function (src, i) {
      var fullSrc = src.startsWith('http') ? src : base + src;
      return '<div class="gallery-slide' + (i === 0 ? ' active' : '') + '" data-index="' + i + '">' +
        '<img src="' + fullSrc + '" alt="" loading="lazy"' + imgStyle + '>' +
        '</div>';
    }).join('');

    el.innerHTML = '<button type="button" class="gallery-arrow gallery-arrow-prev" aria-label="上一张">' + arrowPrevSvg + '</button>' +
      '<button type="button" class="gallery-arrow gallery-arrow-next" aria-label="下一张">' + arrowNextSvg + '</button>' +
      slidesHtml;

    if (config.fit === 'contain') el.classList.add('gallery-fit-contain');

    var idx = 0;
    var slides = el.querySelectorAll('.gallery-slide');
    var intervalId;

    function goTo(nextIdx) {
      if (nextIdx === idx) return;
      if (nextIdx < 0) nextIdx = slides.length - 1;
      if (nextIdx >= slides.length) nextIdx = 0;

      var prevIdx = idx;
      idx = nextIdx;
      var goingNext = idx > prevIdx || (prevIdx === slides.length - 1 && idx === 0);

      slides[prevIdx].classList.add(goingNext ? 'slide-out-left' : 'slide-out-right');
      slides[idx].classList.add(goingNext ? 'slide-in-right' : 'slide-in-left');

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          slides[idx].classList.add('active');
        });
      });

      setTimeout(function () {
        slides[prevIdx].classList.remove('active', 'slide-out-left', 'slide-out-right');
        slides[idx].classList.remove('slide-in-right', 'slide-in-left');
      }, 600);
    }

    function next() { goTo(idx + 1); }
    function prev() { goTo(idx - 1); }

    el.querySelector('.gallery-arrow-prev').addEventListener('click', function (e) {
      e.preventDefault();
      prev();
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(next, speed);
      }
    });
    el.querySelector('.gallery-arrow-next').addEventListener('click', function (e) {
      e.preventDefault();
      next();
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(next, speed);
      }
    });

    intervalId = setInterval(next, speed);
  }

  /* gallery 进入视口时才初始化并加载图片；每次进入都 fade in */
  function init() {
    var galleries = document.querySelectorAll('[data-gallery]');
    if (!galleries.length) return;

    var initIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          initOneGallery(entry.target);
          initIo.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px 0px', threshold: 0 });

    var revealIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('gallery-visible');
        } else {
          entry.target.classList.remove('gallery-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    galleries.forEach(function (g) {
      initIo.observe(g);
      revealIo.observe(g);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
