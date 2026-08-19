/* ==========================================================================
   Zain Consulting — Bilingual layer (English / Arabic)

   How it works
   ------------
   * The HTML ships in English. Every translatable node carries data-i18n="key".
   * The English wording is read straight from the DOM the first time a page
     loads, so there is only ever one copy of it to maintain.
   * assets/js/i18n.dict.js holds the Arabic strings for those same keys.
   * Switching to Arabic swaps the strings, sets dir="rtl" and remembers the
     choice in localStorage.

   Adding a translatable string: give the element data-i18n="some.key" and add
   "some.key" to the Arabic dictionary. Attributes use data-i18n-placeholder,
   data-i18n-aria and data-i18n-content (for <meta>).
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'zc-lang';
  var DEFAULT_LANG = 'en';
  var cache = new WeakMap();   // element -> original English HTML
  var attrCache = new WeakMap();

  var ATTRS = [
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-content', 'content'],
    ['data-i18n-title-attr', 'title']
  ];

  function dict() { return window.ZC_AR || {}; }

  function translate(key) {
    var ar = dict();
    return Object.prototype.hasOwnProperty.call(ar, key) ? ar[key] : null;
  }

  function currentLang() {
    return document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  }

  function applyText(lang) {
    var nodes = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) {
      if (!cache.has(el)) cache.set(el, el.innerHTML);
      var key = el.getAttribute('data-i18n');
      var value = lang === 'ar' ? translate(key) : null;
      el.innerHTML = value === null ? cache.get(el) : value;
    });
  }

  function applyAttrs(lang) {
    ATTRS.forEach(function (pair) {
      var dataAttr = pair[0];
      var target = pair[1];
      var nodes = document.querySelectorAll('[' + dataAttr + ']');
      Array.prototype.forEach.call(nodes, function (el) {
        var store = attrCache.get(el) || {};
        if (!(target in store)) {
          store[target] = el.getAttribute(target) || '';
          attrCache.set(el, store);
        }
        var key = el.getAttribute(dataAttr);
        var value = lang === 'ar' ? translate(key) : null;
        el.setAttribute(target, value === null ? store[target] : value);
      });
    });
  }

  function markSwitch(lang) {
    var buttons = document.querySelectorAll('.lang-switch button[data-lang]');
    Array.prototype.forEach.call(buttons, function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setLang(lang, persist) {
    lang = lang === 'ar' ? 'ar' : 'en';
    var root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    applyText(lang);
    applyAttrs(lang);
    markSwitch(lang);

    if (persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    }

    document.dispatchEvent(new CustomEvent('zc:langchange', { detail: { lang: lang } }));
  }

  function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function init() {
    var lang = stored() || DEFAULT_LANG;
    setLang(lang, false);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.lang-switch button[data-lang]') : null;
      if (!btn) return;
      e.preventDefault();
      setLang(btn.getAttribute('data-lang'), true);
    });
  }

  /* Public helpers used by main.js and inline scripts */
  window.zcSetLang = setLang;
  window.zcLang = currentLang;
  window.zcT = function (key, fallback) {
    if (currentLang() === 'ar') {
      var value = translate(key);
      if (value !== null) return value;
    }
    return fallback === undefined ? key : fallback;
  };

  /* Wait until components.js has mounted the header and footer, otherwise
     their strings would never be translated on a fresh Arabic page load. */
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    init();
  }

  if (window.zcComponentsReady) {
    boot();
  } else {
    document.addEventListener('zc:ready', boot, { once: true });
    window.addEventListener('load', boot);   // fallback if components.js is absent
  }
})();
