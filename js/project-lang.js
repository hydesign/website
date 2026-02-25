/**
 * Project page language: render content by lang, add switcher, sync with index
 * Requires: site-lang.js, project-content.js
 */
(function () {
  var content = window.PROJECT_CONTENT;
  var getLang = window.getSiteLang;
  var setLang = window.setSiteLang;
  if (!content || !getLang) return;

  var path = window.location.pathname || '';
  var slug = '';
  var slugs = Object.keys(content);
  for (var i = 0; i < slugs.length; i++) {
    if (path.indexOf(slugs[i]) !== -1) {
      slug = slugs[i];
      break;
    }
  }
  if (!slug) return;

  var projectData = content[slug];
  if (!projectData) return;

  // Persist lang from URL to storage when present
  var urlLang = (/[?&]lang=([^&]+)/.exec(window.location.search) || [])[1];
  if (urlLang && (urlLang === 'en' || urlLang === 'zh') && setLang) {
    setLang(urlLang);
  }

  var lang = getLang();
  if (lang !== 'en' && lang !== 'zh') lang = 'en';

  function render() {
    var d = projectData[lang];
    if (!d) return;

    var base = path.indexOf('/projects/') !== -1 ? '../' : '';

    // Common: back link
    var backEl = document.querySelector('[class*="-back"]');
    if (backEl && d.backLink) {
      backEl.innerHTML = d.backLink;
      backEl.href = base + 'index.html' + (lang === 'zh' ? '?lang=zh' : '');
    }

    // Project-specific fill
    if (slug === 'drift-of-the-uncharted') {
      set('.project-drift-title', d.title);
      set('.project-drift-year', d.year);
      set('.project-drift-keywords', d.keywords);
      var introWrap = document.querySelector('.project-drift-intro .project-drift-text');
      if (introWrap) introWrap.innerHTML = '<p>' + (d.intro || '') + '</p>';
      var ctxWrap = document.querySelector('.project-drift-context-text');
      if (ctxWrap) ctxWrap.innerHTML = '<p>' + (d.context1 || '') + '</p><p>' + (d.context2 || '') + '</p>';
    } else if (slug === 'artificial-life-one-leg') {
      set('.project-one-leg-title', d.title);
      set('.project-one-leg-meta', d.meta);
      set('.project-one-leg-brief-title', d.briefTitle);
      var right = document.querySelector('.project-one-leg-right-content');
      if (right) {
        var p = right.querySelectorAll('p');
        if (p[0]) p[0].textContent = d.p1;
        // p[1] is before gallery, no - the structure is p, gallery. So just first p
      }
      var left = document.querySelector('.project-one-leg-left-content');
      if (left) {
        var ps = left.querySelectorAll('p');
        if (ps[0]) ps[0].textContent = d.p2;
        if (ps[1]) ps[1].textContent = d.p3;
      }
    } else if (slug === 'buffer-beach-let-the-waves-render') {
      set('.project-buffer-title', d.title);
      var metaBuf = document.querySelector('.project-buffer-grid-1 .project-buffer-meta');
      if (metaBuf && Array.isArray(d.meta)) {
        metaBuf.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var textBuf = document.querySelector('.project-buffer-grid-2 .project-buffer-text');
      if (textBuf) textBuf.innerHTML = '<p>' + d.p1 + '</p><p>' + d.p2 + '</p>';
    } else if (slug === 'nomadic-annotators') {
      set('.project-nomadic-title', d.title);
      var metaNom = document.querySelector('.project-nomadic-grid-1 .project-nomadic-meta');
      if (metaNom && Array.isArray(d.meta)) {
        metaNom.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var textNom = document.querySelector('.project-nomadic-grid-3 .project-nomadic-text');
      if (textNom) textNom.innerHTML = '<p>' + d.p1 + '</p><p>' + d.p2 + '</p>';
    } else if (slug === 'i-just-stay-in-my-home-not-go-anywhere') {
      set('.project-i-just-stay-title', d.title);
      var metaStay = document.querySelector('.project-i-just-stay-meta');
      if (metaStay && Array.isArray(d.meta)) {
        metaStay.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var textStay = document.querySelector('.project-i-just-stay-text');
      if (textStay) textStay.innerHTML = '<p>' + d.p1 + '</p>';
    } else if (slug === 'fish-tree-rings-and-memory') {
      set('.project-fish-title', d.title);
      var metaFish = document.querySelector('.project-fish-meta');
      if (metaFish && Array.isArray(d.meta)) {
        metaFish.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var textFish = document.querySelector('.project-fish-text');
      if (textFish) textFish.innerHTML = '<p>' + d.p1 + '</p>';
    } else if (slug === 'return-to-the-peach-blossom-wonderland') {
      set('.project-peach-title', d.title);
      var metaPeach = document.querySelector('.project-peach-meta');
      if (metaPeach && Array.isArray(d.meta)) {
        metaPeach.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var quotePeach = document.querySelector('.project-peach-quote');
      if (quotePeach) quotePeach.innerHTML = '<p>' + (d.quote1 || '') + '</p><p>' + (d.quote2 || '') + '</p>';
      var textPeach = document.querySelector('.project-peach-text');
      if (textPeach) textPeach.innerHTML = '<p>' + d.p1 + '</p>';
    } else if (slug === 'amphibious-rover-ldn2030-scouting-log') {
      set('.project-amphibious-title', d.title);
      var metaAmp = document.querySelector('.project-amphibious-meta');
      if (metaAmp && Array.isArray(d.meta)) {
        metaAmp.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var collabEl = document.querySelector('.project-amphibious-collab');
      if (collabEl && d.collab) collabEl.innerHTML = d.collab;
      var textAmp = document.querySelectorAll('.project-amphibious-text');
      if (textAmp[0]) textAmp[0].innerHTML = '<p>' + d.p1 + '</p>';
      if (textAmp[1]) textAmp[1].innerHTML = '<p>' + d.p2 + '</p><p class="project-amphibious-ref">' + d.ref + '</p>';
    } else if (slug === 'phalaenopsis-and-their-friends-whisper-their-tales') {
      set('.project-phalaenopsis-title', d.title);
      var subEl = document.querySelector('.project-phalaenopsis-subtitle');
      if (subEl) subEl.textContent = d.subtitle || '';
      var metaPhala = document.querySelector('.project-phalaenopsis-meta');
      if (metaPhala && Array.isArray(d.meta)) {
        metaPhala.innerHTML = d.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
      }
      var textPhala = document.querySelector('.project-phalaenopsis-text');
      if (textPhala) textPhala.innerHTML = '<p>' + d.p1 + '</p><p>' + d.p2 + '</p>';
      var refTitle = document.querySelector('.phala-reference-title');
      if (refTitle && d.refTitle) refTitle.textContent = d.refTitle;
    }

    document.title = (d.title || '') + ' — aryyuehuang';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }

  function set(sel, val) {
    if (!val) return;
    var el = document.querySelector(sel);
    if (el) el.textContent = val;
  }

  function bindLangSwitcher() {
    var bars = document.querySelectorAll('.index-lang-bar, .menu-overlay-lang');
    if (!bars.length) return;
    bars.forEach(function (bar) {
      var btns = bar.querySelectorAll('.index-lang-btn, .menu-overlay-lang-btn');
      btns.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
        btn.onclick = function (e) {
          e.preventDefault();
          var newLang = btn.dataset.lang;
          if (newLang === lang) return;
          lang = newLang;
          if (setLang) setLang(lang);
          var path = window.location.pathname;
          var q = lang === 'zh' ? '?lang=zh' : '';
          window.history.replaceState({}, '', path + q);
          document.querySelectorAll('.index-lang-btn, .menu-overlay-lang-btn').forEach(function (b) { b.classList.remove('active'); });
          document.querySelectorAll('.index-lang-btn[data-lang="' + lang + '"], .menu-overlay-lang-btn[data-lang="' + lang + '"]').forEach(function (b) { b.classList.add('active'); });
          render();
          document.dispatchEvent(new CustomEvent('siteLangChange', { detail: { lang: lang } }));
        };
      });
    });
  }

  function init() {
    render();
    bindLangSwitcher();
    document.addEventListener('headerLoaded', bindLangSwitcher);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  setTimeout(bindLangSwitcher, 800);
})();
