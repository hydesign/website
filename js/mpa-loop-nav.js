/**
 * MPA 页面上下滑循环导航（不用于 projects/*）
 * 顺序：index -> about -> publications -> contact -> index
 */
(function () {
  var path = window.location.pathname || "";
  if (path.indexOf("/projects/") !== -1) return;

  function getPageKey() {
    var file = path.split("/").pop() || "index.html";
    if (file === "" || file === "index.html") return "index";
    if (file === "about.html") return "about";
    if (file === "publications.html") return "publications";
    if (file === "contact.html") return "contact";
    return null;
  }

  var key = getPageKey();
  if (!key) return;

  var order = ["index", "about", "publications", "contact"];
  var hrefMap = {
    index: "index.html",
    about: "about.html",
    publications: "publications.html",
    contact: "contact.html"
  };

  var idx = order.indexOf(key);
  var prevKey = order[(idx - 1 + order.length) % order.length];
  var nextKey = order[(idx + 1) % order.length];

  var EDGE = 72;
  var LOCK_MS = 650;
  var lockedUntil = 0;
  var touchStartY = 0;

  function now() {
    return Date.now();
  }

  function isLocked() {
    return now() < lockedUntil;
  }

  function lock() {
    lockedUntil = now() + LOCK_MS;
  }

  function isAtTop() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    return y <= EDGE;
  }

  function isAtBottom() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    var sh = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    return y + h >= sh - EDGE;
  }

  function goTo(targetKey) {
    if (isLocked()) return;
    lock();
    window.location.href = hrefMap[targetKey];
  }

  window.addEventListener("wheel", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.deltaY > 0 && isAtBottom()) {
      e.preventDefault();
      goTo(nextKey);
      return;
    }
    if (e.deltaY < 0 && isAtTop()) {
      e.preventDefault();
      goTo(prevKey);
    }
  }, { passive: false });

  window.addEventListener("touchstart", function (e) {
    if (!e.touches || !e.touches[0]) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    var dy = touchStartY - e.changedTouches[0].clientY;
    var threshold = 90;
    if (dy > threshold && isAtBottom()) {
      goTo(nextKey);
      return;
    }
    if (dy < -threshold && isAtTop()) {
      goTo(prevKey);
    }
  }, { passive: true });

  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" && isAtBottom()) {
      e.preventDefault();
      goTo(nextKey);
      return;
    }
    if (e.key === "ArrowUp" && isAtTop()) {
      e.preventDefault();
      goTo(prevKey);
    }
  });
})();
