/**
 * 单页滚动：About 渲染、hash 路由、nav 高亮
 */
(function () {
  var SECTION_IDS = ['project', 'about', 'publications', 'contact'];
  var SECTION_PAGES = { project: 'projects', about: 'about', publications: 'publications', contact: 'contact' };

  function getAboutLang() {
    var cb = document.querySelector('.cv-lang-btn.active');
    if (cb) return cb.dataset.lang;
    var ib = document.querySelector('.index-lang-btn.active, .menu-overlay-lang-btn.active');
    if (ib) return ib.dataset.lang;
    return document.documentElement.lang === 'zh-CN' || document.documentElement.lang === 'zh' ? 'zh' : 'en';
  }

  function renderAbout() {
    var aboutData = window.CV_ABOUT;
    var educationData = window.CV_EDUCATION;
    var exhibitionData = window.CV_EXHIBITION;
    var honorsData = window.CV_HONORS;
    if (!aboutData) return;
    var lang = getAboutLang();
    if (!educationData || !exhibitionData || !honorsData) return;
    var about = aboutData[lang];
    var edu = educationData[lang];
    var ex = exhibitionData[lang];
    var hon = honorsData[lang];
    if (!about || !edu || !ex || !hon) return;
    var bioTitleEl = document.getElementById('about-bio-title');
    var bioTextEl = document.getElementById('about-bio-text');
    var practiceTitleEl = document.getElementById('about-practice-title');
    var practiceTextEl = document.getElementById('about-practice-text');
    var educationList = document.getElementById('cv-education-list');
    var exhibitionList = document.getElementById('cv-exhibition-list');
    var honorsList = document.getElementById('cv-honors-list');
    if (bioTitleEl) bioTitleEl.textContent = about.bioTitle;
    if (bioTextEl) bioTextEl.textContent = about.bio;
    if (practiceTitleEl) practiceTitleEl.textContent = about.practiceTitle;
    if (practiceTextEl) practiceTextEl.innerHTML = about.practice.map(function (p) { return '<p class="about-intro">' + p + '</p>'; }).join('');
    if (educationList) educationList.innerHTML = edu.map(function (item) { return '<li><strong>' + item.period + '</strong> — ' + item.text + '</li>'; }).join('');
    if (exhibitionList) exhibitionList.innerHTML = ex.map(function (group) { return group.items.map(function (item) { return '<li><strong>' + group.year + '</strong> ' + item + '</li>'; }).join(''); }).join('');
    if (honorsList) honorsList.innerHTML = hon.map(function (item) { return '<li>' + item + '</li>'; }).join('');
  }

  function updateCvLabels() {
    var lang = getAboutLang();
    document.querySelectorAll('.cv-label-en').forEach(function (el) { el.style.display = lang === 'en' ? 'inline' : 'none'; });
    document.querySelectorAll('.cv-label-zh').forEach(function (el) { el.style.display = lang === 'zh' ? 'inline' : 'none'; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cv-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newLang = this.dataset.lang;
        document.querySelectorAll('.cv-lang-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.index-lang-btn, .menu-overlay-lang-btn').forEach(function (b) {
          b.classList.toggle('active', b.dataset.lang === newLang);
        });
        renderAbout();
        updateCvLabels();
        document.dispatchEvent(new CustomEvent('siteLangChange', { detail: { lang: newLang } }));
      });
    });
  });

  document.addEventListener('siteLangChange', function (e) {
    if (e.detail && e.detail.lang) {
      document.querySelectorAll('.cv-lang-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.lang === e.detail.lang);
      });
      renderAbout();
      updateCvLabels();
    }
  });

  function scrollToHash() {
    var hash = (window.location.hash || '').slice(1);
    if (hash && SECTION_IDS.indexOf(hash) >= 0) {
      var el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        updateNavFromScroll();
      }
    } else {
      updateNavFromScroll();
    }
  }

  function updateNavFromScroll() {
    var sections = SECTION_IDS.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var vh = window.innerHeight;
    var current = 'projects';
    for (var i = sections.length - 1; i >= 0; i--) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top <= vh * 0.5) {
        current = SECTION_PAGES[SECTION_IDS[i]];
        break;
      }
    }
    document.querySelectorAll('.nav-link[data-page], .menu-overlay-link[data-page]').forEach(function (a) {
      a.classList.toggle('active', a.dataset.page === current);
    });
  }

  function updateHashFromScroll() {
    var sections = SECTION_IDS.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var vh = window.innerHeight;
    for (var i = sections.length - 1; i >= 0; i--) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top <= vh * 0.5) {
        var newHash = '#' + SECTION_IDS[i];
        if (window.location.hash !== newHash) {
          history.replaceState(null, '', newHash);
        }
        break;
      }
    }
  }

  renderAbout();
  updateCvLabels();
  scrollToHash();

  window.addEventListener('scroll', function () {
    updateNavFromScroll();
    updateHashFromScroll();
  }, { passive: true });

  document.addEventListener('headerLoaded', function () {
    updateNavFromScroll();
  });
})();
