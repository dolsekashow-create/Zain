/* ==========================================================================
   Zain Consulting — Interactions
   Header behaviour, mega menu, reveals, counters, filters, accordion, forms.
   ========================================================================== */
(function () {
  'use strict';

  var MOBILE = '(max-width: 1080px)';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function isMobile() { return window.matchMedia(MOBILE).matches; }

  function init() {
    stickyHeader();
    mobileNav();
    megaMenus();
    revealOnScroll();
    counters();
    backToTop();
    blogFilters();
    accordions();
    contactForm();
    newsletterForm();
  }

  /* ------------------------------------------------------------------ */
  /* Header shadow on scroll                                             */
  /* ------------------------------------------------------------------ */
  function stickyHeader() {
    var header = $('#siteHeader');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* Mobile drawer                                                       */
  /* ------------------------------------------------------------------ */
  function mobileNav() {
    var toggle = $('#navToggle');
    var nav = $('#primaryNav');
    var backdrop = $('#navBackdrop');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('is-locked', open);
      if (backdrop) {
        backdrop.hidden = !open;
        // Force a frame so the transition runs.
        window.requestAnimationFrame(function () {
          backdrop.classList.toggle('is-visible', open);
        });
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close the drawer once a real destination is picked.
    $$('.nav__list a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobile() && !link.parentElement.classList.contains('has-mega')) setOpen(false);
      });
    });
    $$('.mega a', nav).forEach(function (link) {
      link.addEventListener('click', function () { if (isMobile()) setOpen(false); });
    });

    window.addEventListener('resize', function () {
      if (!isMobile() && nav.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Mega menus — hover/focus on desktop, tap to expand on mobile        */
  /* ------------------------------------------------------------------ */
  function megaMenus() {
    $$('.nav__item.has-mega').forEach(function (item) {
      var link = $('.nav__link', item);
      if (!link) return;

      link.addEventListener('click', function (e) {
        if (!isMobile()) return;
        e.preventDefault();
        var open = item.classList.contains('is-open');
        $$('.nav__item.has-mega').forEach(function (other) {
          other.classList.remove('is-open');
          var l = $('.nav__link', other);
          if (l) l.setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('is-open', !open);
        link.setAttribute('aria-expanded', !open ? 'true' : 'false');
      });

      item.addEventListener('focusin', function () {
        if (isMobile()) return;
        item.classList.add('is-open');
        link.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('focusout', function (e) {
        if (isMobile()) return;
        if (!item.contains(e.relatedTarget)) {
          item.classList.remove('is-open');
          link.setAttribute('aria-expanded', 'false');
        }
      });

      item.addEventListener('mouseenter', function () {
        if (!isMobile()) link.setAttribute('aria-expanded', 'true');
      });
      item.addEventListener('mouseleave', function () {
        if (!isMobile()) {
          link.setAttribute('aria-expanded', 'false');
          item.classList.remove('is-open');
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $$('.nav__item.has-mega.is-open').forEach(function (item) {
        item.classList.remove('is-open');
        var l = $('.nav__link', item);
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Reveal on scroll                                                    */
  /* ------------------------------------------------------------------ */
  function revealOnScroll() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        window.setTimeout(function () { el.classList.add('is-revealed'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Number counters                                                     */
  /* ------------------------------------------------------------------ */
  function counters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      if (isNaN(target)) return;
      if (reduceMotion) { el.textContent = prefix + target + suffix; return; }

      var duration = 1400;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Back to top                                                         */
  /* ------------------------------------------------------------------ */
  function backToTop() {
    var btn = $('#toTop');
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle('is-visible', window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Blog category filter                                                */
  /* ------------------------------------------------------------------ */
  function blogFilters() {
    var pills = $$('.filter-pill');
    var posts = $$('.post-item');
    if (!pills.length || !posts.length) return;
    var empty = $('.empty-state');

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var cat = pill.getAttribute('data-filter');
        pills.forEach(function (p) {
          p.classList.toggle('is-active', p === pill);
          p.setAttribute('aria-pressed', p === pill ? 'true' : 'false');
        });

        var shown = 0;
        posts.forEach(function (post) {
          var match = cat === 'all' || post.getAttribute('data-category') === cat;
          post.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });
        if (empty) empty.classList.toggle('is-visible', shown === 0);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Accordion (FAQ)                                                     */
  /* ------------------------------------------------------------------ */
  function accordions() {
    $$('.acc-item').forEach(function (item) {
      var btn = $('.acc-btn', item);
      var panel = $('.acc-panel', item);
      if (!btn || !panel) return;

      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        var group = item.closest('.accordion');
        if (group) {
          $$('.acc-item.is-open', group).forEach(function (other) {
            if (other === item) return;
            other.classList.remove('is-open');
            var p = $('.acc-panel', other);
            var b = $('.acc-btn', other);
            if (p) p.style.maxHeight = '';
            if (b) b.setAttribute('aria-expanded', 'false');
          });
        }
        item.classList.toggle('is-open', !open);
        btn.setAttribute('aria-expanded', !open ? 'true' : 'false');
        panel.style.maxHeight = !open ? panel.scrollHeight + 'px' : '';
      });
    });

    window.addEventListener('resize', function () {
      $$('.acc-item.is-open .acc-panel').forEach(function (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form — client-side validation                               */
  /* ------------------------------------------------------------------ */
  function contactForm() {
    var form = $('#contactForm');
    if (!form) return;
    var success = $('#formSuccess');

    function fieldOf(input) { return input.closest('.field') || input.closest('.checkbox-row'); }

    function validate(input) {
      var value = (input.value || '').trim();
      var ok = true;

      if (input.type === 'checkbox') ok = input.checked;
      else if (input.required && !value) ok = false;
      else if (value && input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      else if (value && input.type === 'tel') ok = /^[+()\d\s-]{7,}$/.test(value);

      var wrap = fieldOf(input);
      if (wrap) wrap.classList.toggle('has-error', !ok);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    }

    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value || input.required) validate(input); });
      input.addEventListener('input', function () {
        var wrap = fieldOf(input);
        if (wrap && wrap.classList.contains('has-error')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var inputs = $$('input, select, textarea', form).filter(function (i) { return i.required; });
      var firstBad = null;
      inputs.forEach(function (input) {
        if (!validate(input) && !firstBad) firstBad = input;
      });

      if (firstBad) {
        firstBad.focus();
        firstBad.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
        return;
      }

      // No back end is wired up yet — see README for connecting a form service.
      if (success) {
        success.classList.add('is-visible');
        success.setAttribute('tabindex', '-1');
        success.focus();
        success.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      form.reset();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Newsletter                                                          */
  /* ------------------------------------------------------------------ */
  function newsletterForm() {
    var form = $('#newsletterForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input[type="email"]', form);
      var note = $('#newsletterNote');
      if (!input || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        if (note) note.textContent = window.zcT ? window.zcT('newsletter.invalid', 'Please enter a valid email address.') : 'Please enter a valid email address.';
        return;
      }
      if (note) note.textContent = window.zcT ? window.zcT('newsletter.thanks', 'Thank you — you are on the list.') : 'Thank you — you are on the list.';
      form.reset();
    });
  }

  /* The header and footer are injected by components.js on DOMContentLoaded.
     Deferred scripts run before that event, so bind to zc:ready instead —
     otherwise the nav toggle, mega menus and back-to-top never get wired. */
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
