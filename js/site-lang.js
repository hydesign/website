/**
 * 站点语言：URL 优先，其次 localStorage，默认英文
 * 用于 index 与 project 页面的语言同步
 */
(function () {
  var STORAGE_KEY = 'siteLang';

  function getFromUrl() {
    var m = /[?&]lang=([^&]+)/.exec(window.location.search);
    return m ? m[1] : null;
  }

  function getFromStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) { return null; }
  }

  window.getSiteLang = function () {
    return getFromUrl() || getFromStorage() || 'en';
  };

  window.setSiteLang = function (lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  };
})();
