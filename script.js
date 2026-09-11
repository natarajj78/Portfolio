(function () {
  'use strict';

  // ---------- Sticky nav border on scroll ----------
  var nav = document.getElementById('siteNav');
  function onScroll() {
    if (window.scrollY > 8) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  var toggle = document.getElementById('navToggle');
  var sheet = document.getElementById('mobileSheet');
  if (toggle && sheet) {
    toggle.addEventListener('click', function () {
      sheet.classList.toggle('open');
    });
    sheet.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        sheet.classList.remove('open');
      });
    });
  }

  // ---------- Scroll reveals ----------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---------- Case study routing (single-file, hash-based) ----------
  var caseViews = {
    centrica: document.getElementById('caseCentrica')
  };

  function openCase(key) {
    var view = caseViews[key];
    if (!view) return;
    view.classList.add('open');
    document.body.style.overflow = 'hidden';
    view.scrollTop = 0;
    history.pushState(null, '', '#work/' + key);
  }

  function closeCase() {
    Object.keys(caseViews).forEach(function (k) {
      caseViews[k].classList.remove('open');
    });
    document.body.style.overflow = '';
    history.pushState(null, '', '#work');
  }

  document.querySelectorAll('[data-case]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openCase(el.getAttribute('data-case'));
    });
  });

  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      closeCase();
    });
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCase();
  });

  // Deep link support: #work/centrica opens directly
  function routeFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (hash.indexOf('work/') === 0) {
      var key = hash.split('/')[1];
      if (caseViews[key]) openCase(key);
    }
  }
  window.addEventListener('popstate', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash.indexOf('work/') !== 0) closeCase();
  });
  routeFromHash();

})();
