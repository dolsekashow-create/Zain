/* ==========================================================================
   Zain Consulting — Shared components
   Injects the icon sprite, the site header (with mega menu) and the footer
   so every page stays in sync from a single source of truth.
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     1. Icon sprite — same-document <symbol>s so <use href="#id"> works
        everywhere, including when the site is opened from the file system.
     ---------------------------------------------------------------------- */
  var ICONS = {
    'arrow-right': '<path d="M4 12h15"/><path d="m13 5 7 7-7 7"/>',
    'arrow-up': '<path d="M12 20V5"/><path d="m5 12 7-7 7 7"/>',
    'chevron-down': '<path d="m5 8.5 7 7 7-7"/>',
    'chevron-right': '<path d="m9 5 7 7-7 7"/>',
    'menu': '<path d="M3 6h18M3 12h18M3 18h18"/>',
    'close': '<path d="M18 6 6 18M6 6l12 12"/>',
    'check': '<path d="m4 12.5 5.5 5.5L20 6.5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.3 2.6 2.6 5-5.4"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'file-text': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    'clipboard-check': '<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V4.2A2.2 2.2 0 0 1 11.2 2h1.6A2.2 2.2 0 0 1 15 4.2V5"/><path d="m9.2 13.4 2 2 3.6-4"/>',
    'trending-up': '<path d="M3 17.5 9.5 11l4 4L21 7.5"/><path d="M15.5 7.5H21v5.5"/>',
    'graduation': '<path d="m12 4 10 5-10 5L2 9z"/><path d="M6.5 11.2V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.8"/>',
    'link': '<path d="M10.2 13.4a4.6 4.6 0 0 0 6.9.5l2-2a4.6 4.6 0 0 0-6.5-6.5l-1.1 1.1"/><path d="M13.8 10.6a4.6 4.6 0 0 0-6.9-.5l-2 2a4.6 4.6 0 0 0 6.5 6.5l1.1-1.1"/>',
    'users': '<path d="M16 20v-1.8a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V20"/><circle cx="9.2" cy="7.5" r="3.6"/><path d="M21.5 20v-1.8a4 4 0 0 0-3-3.85"/><path d="M16.5 4.1a3.6 3.6 0 0 1 0 6.8"/>',
    'trophy': '<path d="M7 4h10v5.5a5 5 0 0 1-10 0z"/><path d="M17 5.2h3v1.6a3.2 3.2 0 0 1-3.2 3.2"/><path d="M7 5.2H4v1.6A3.2 3.2 0 0 0 7.2 10"/><path d="M12 14.5V18"/><path d="M8.2 21h7.6l-1.1-3H9.3z"/>',
    'shield': '<path d="M12 3 4.5 6v6c0 4.4 3.2 7.9 7.5 9 4.3-1.1 7.5-4.6 7.5-9V6z"/><path d="m9.2 12 2 2 3.6-4"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.4 2.6 3.7 5.7 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.7-3.7-9S9.6 5.6 12 3z"/>',
    'handshake': '<path d="M12 8.6 9.6 6.2a2 2 0 0 0-2.8 0L3 10v4l3.4 3.4"/><path d="m12 8.6 2.4-2.4a2 2 0 0 1 2.8 0L21 10v4l-3.4 3.4"/><path d="m8 14.2 2.6 2.6a1.6 1.6 0 0 0 2.2 0l2.8-2.8"/>',
    'bar-chart': '<path d="M3 20.5h18"/><path d="M6.5 20.5v-6M11.5 20.5V8M16.5 20.5v-9M21 20.5V4.5"/>',
    'expand': '<path d="m10 14-6 6M4.5 14.5V20h5.5"/><path d="m14 10 6-6M19.5 9.5V4h-5.5"/>',
    'target': '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/>',
    'bulb': '<path d="M9.6 18.5h4.8"/><path d="M10.4 21.3h3.2"/><path d="M12 2.8a6.2 6.2 0 0 0-3.7 11.2c.7.5 1.1 1.3 1.2 2.1h5c.1-.8.5-1.6 1.2-2.1A6.2 6.2 0 0 0 12 2.8z"/>',
    'award': '<circle cx="12" cy="9" r="5.6"/><path d="m8.6 13.6-1.4 7 4.8-2.5 4.8 2.5-1.4-7"/>',
    'mail': '<rect x="2.5" y="5" width="19" height="14" rx="2.2"/><path d="m3.2 7.2 8 5.4a1.4 1.4 0 0 0 1.6 0l8-5.4"/>',
    'phone': '<path d="M15.8 21A13.6 13.6 0 0 1 3 8.2 3 3 0 0 1 6 5.2h1.5a1 1 0 0 1 1 .8l.8 3.1a1 1 0 0 1-.3 1L7.6 11.4a12.2 12.2 0 0 0 5 5l1.3-1.4a1 1 0 0 1 1-.3l3.1.8a1 1 0 0 1 .8 1V18a3 3 0 0 1-3 3z"/>',
    'pin': '<path d="M20 10.4c0 5.5-8 12.1-8 12.1s-8-6.6-8-12.1a8 8 0 0 1 16 0z"/><circle cx="12" cy="10.3" r="3"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 6.8v5.5l3.6 2"/>',
    'calendar': '<rect x="3" y="5" width="18" height="16" rx="2.2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    'quote': '<path d="M9.5 11H6a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 6 5h1a2.5 2.5 0 0 1 2.5 2.5V13a6 6 0 0 1-4 5.6"/><path d="M20.5 11H17a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 17 5h1a2.5 2.5 0 0 1 2.5 2.5V13a6 6 0 0 1-4 5.6"/>',
    'zap': '<path d="M13.2 2.5 4.5 14h7l-.7 7.5L19.5 10h-7z"/>',
    'rocket': '<path d="M5.2 15.3c-1.5 1.5-2 6.2-2 6.2s4.7-.5 6.2-2a2.2 2.2 0 0 0-3-3z"/><path d="M12.6 14.4 9.1 10.9s.4-5.1 4.4-8.1c3 0 5.6 2.6 5.6 5.6-3 4-6.5 6-6.5 6z"/><path d="m9.1 10.9-3.4-1.4L8.2 7l2.4.4"/><path d="m12.6 14.4 1.4 3.4 2.5-2.5-.4-2.4"/>',
    'briefcase': '<rect x="2.5" y="7" width="19" height="13.5" rx="2.2"/><path d="M8.5 7V5.4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7"/><path d="M2.5 12.6h19"/>',
    'flask': '<path d="M9.5 3h5"/><path d="M10.6 3v6.4L5.2 18.3a2 2 0 0 0 1.7 3.1h10.2a2 2 0 0 0 1.7-3.1L13.4 9.4V3"/><path d="M7.8 15.2h8.4"/>',
    'sun': '<circle cx="12" cy="12" r="4.4"/><path d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.2-4.2"/>',
    'layers': '<path d="m12 3 9 4.8-9 4.8-9-4.8z"/><path d="m3 13.2 9 4.8 9-4.8"/>',
    'star': '<path d="m12 3.2 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.5l-5.6 2.9 1.1-6.2L3 9.8l6.2-.9z"/>',
    'building': '<path d="M4 21V5.2A2.2 2.2 0 0 1 6.2 3h6.6A2.2 2.2 0 0 1 15 5.2V21"/><path d="M15 9.5h2.8A2.2 2.2 0 0 1 20 11.7V21"/><path d="M2 21h20"/><path d="M8 7.5h3M8 11.5h3M8 15.5h3"/>',
    'factory': '<path d="M3 21V10.5l6 3.8V10.5l6 3.8V7l5-3v17z"/><path d="M2 21h20"/><path d="M7 18h2M13 18h2"/>',
    'truck': '<path d="M2.5 7.5h11v10h-11z"/><path d="M13.5 10.5h3.9l3.1 3.2v3.8h-7z"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="17" cy="18.5" r="2"/>',
    'scale': '<path d="M12 3.5v17"/><path d="M7 20.5h10"/><path d="M4.5 7h15"/><path d="m4.5 7-2.6 5.6a3 3 0 0 0 5.2 0z"/><path d="m19.5 7-2.6 5.6a3 3 0 0 0 5.2 0z"/>',
    'lock': '<rect x="4" y="10" width="16" height="11" rx="2.2"/><path d="M8 10V7.2a4 4 0 0 1 8 0V10"/>',
    'message': '<path d="M21 11.8a8.2 8.2 0 0 1-11.8 7.4L3.5 21l1.8-5.5A8.2 8.2 0 1 1 21 11.8z"/>',
    'user': '<circle cx="12" cy="8" r="4"/><path d="M4.5 21v-1.2a6 6 0 0 1 6-6h3a6 6 0 0 1 6 6V21"/>',
    'compass': '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z"/>',
    'door': '<path d="M4 21h16"/><path d="M6.5 21V4.6a1.6 1.6 0 0 1 1.9-1.57l7 1.3A1.6 1.6 0 0 1 16.7 5.9V21"/><circle cx="13.6" cy="12.4" r="1.05" fill="currentColor" stroke="none"/>',
    'eye-horus': '<path d="M2.6 9.4C7 4.6 15.4 3.4 22 6" stroke-width="2.1"/><path d="M2 13.2C5.6 8.8 13.4 8 21.8 10.4c-5 5-14 6.4-19.8 2.8Z" fill="currentColor" stroke="none"/><circle cx="12.6" cy="11.5" r="2.3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.4 15.6 5.8 21" stroke-width="2"/><path d="M13.9 15.8c-.4 3.6 1.9 5.6 4.4 5.1 2.2-.5 2.8-3 1.3-4.2" stroke-width="2"/>',
    'linkedin': '<path d="M5 3.4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9.6h4V21H3zM10 9.6h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.1c0-1.22-.02-2.8-1.9-2.8-1.9 0-2.2 1.34-2.2 2.72V21h-4z" fill="currentColor" stroke="none"/>',
    'facebook': '<path d="M14 9.4V7.9c0-.75.2-1.15 1.4-1.15h1.5V3.2h-2.4C11.2 3.2 10 4.7 10 7.2v2.2H8v3.4h2V21h4v-8.2h2.7l.35-3.4z" fill="currentColor" stroke="none"/>',
    'instagram': '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none"/>',
    'x-social': '<path d="M3 3h4.6l4.8 6.5L18.1 3H21l-6.9 8L21.4 21h-4.6l-5.1-6.9L5.2 21H2.4l7.4-8.6z" fill="currentColor" stroke="none"/>',
    'whatsapp': '<path d="M12 2.9a9 9 0 0 0-7.7 13.6L3 21.4l5.1-1.3A9 9 0 1 0 12 2.9zm5.2 12.6c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a12 12 0 0 1-4.4-3.1 8.7 8.7 0 0 1-1.8-3c-.2-.6 0-1.3.4-1.7l.5-.5c.2-.2.5-.2.7.1l1 1.6c.1.2.1.4 0 .6l-.4.6c-.2.2-.2.4-.1.6.4.8 1.5 2 2.6 2.5.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.9c.3.1.4.4.3.6z" fill="currentColor" stroke="none"/>'
  };

  function buildSprite() {
    var out = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">';
    Object.keys(ICONS).forEach(function (key) {
      out += '<symbol id="i-' + key + '" viewBox="0 0 24 24">' + ICONS[key] + '</symbol>';
    });
    return out + '</svg>';
  }

  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }
  window.zcIcon = icon;

  /* ----------------------------------------------------------------------
     2. Brand mark
     ---------------------------------------------------------------------- */
  function brand(light) {
    return '' +
      '<a class="brand' + (light ? ' brand--light' : '') + '" href="index.html" aria-label="Zain Consulting">' +
        '<img class="brand__mark" src="assets/img/logo-mark.png" alt="" width="160" height="176">' +
        '<span class="brand__text">' +
          '<span class="brand__name">Zain Consulting</span>' +
          '<span class="brand__tag" data-i18n="brand.tagline">Your Bridge to Major Markets</span>' +
        '</span>' +
      '</a>';
  }

  /* ----------------------------------------------------------------------
     3. Navigation model
     ---------------------------------------------------------------------- */
  var SERVICE_GROUPS = [
    {
      key: 'tender', icon: 'clipboard-check', href: 'services.html#tender-qualification',
      title: 'Tender Qualification &amp; Registration', i18n: 'svc.tender.title',
      links: [
        ['services.html#tender-qualification', 'Company Registration', 'svc.tender.l1'],
        ['services.html#tender-qualification', 'Tender &amp; Bid Preparation', 'svc.tender.l2'],
        ['services.html#tender-qualification', 'Pricing Strategy Consulting', 'svc.tender.l3'],
        ['services.html#tender-qualification', 'Technical Analysis &amp; Review', 'svc.tender.l4']
      ]
    },
    {
      key: 'bizdev', icon: 'trending-up', href: 'services.html#business-development',
      title: 'Business Development', i18n: 'svc.bizdev.title',
      links: [
        ['services.html#business-development', 'Feasibility Studies', 'svc.bizdev.l1'],
        ['services.html#business-development', 'Market Entry Strategy', 'svc.bizdev.l2'],
        ['services.html#business-development', 'Growth &amp; Expansion Support', 'svc.bizdev.l3'],
        ['services.html#business-development', 'Partner &amp; Agency Matching', 'svc.bizdev.l4']
      ]
    },
    {
      key: 'training', icon: 'graduation', href: 'services.html#training-coaching',
      title: 'Training &amp; Coaching', i18n: 'svc.training.title',
      links: [
        ['services.html#training-coaching', 'Online Courses', 'svc.training.l1'],
        ['services.html#training-coaching', 'Tender Procedures Training', 'svc.training.l3'],
        ['services.html#training-coaching', 'Registration Training', 'svc.training.l4'],
        ['services.html#training-coaching', 'Bid Management Coaching', 'svc.training.l5']
      ]
    },
    {
      key: 'supply', icon: 'link', href: 'services.html#supply-chain',
      title: 'Supply Chain Support', i18n: 'svc.supply.title',
      links: [
        ['services.html#supply-chain', 'Supplier Identification', 'svc.supply.l1'],
        ['services.html#supply-chain', 'Manufacturer Sourcing', 'svc.supply.l2'],
        ['services.html#supply-chain', 'Chemicals Procurement', 'svc.supply.l3'],
        ['services.html#supply-chain', 'Equipment Procurement', 'svc.supply.l4']
      ]
    }
  ];

  var ABOUT_LINKS = [
    ['about.html#story', 'Our Story', 'nav.about.story'],
    ['about.html#vision', 'Vision', 'nav.about.vision'],
    ['about.html#mission', 'Mission', 'nav.about.mission'],
    ['about.html#values', 'Values', 'nav.about.values'],
    ['why-zain.html', 'Why Zain Consulting', 'nav.about.why']
  ];

  function linkList(items) {
    return '<ul class="mega__links">' + items.map(function (it) {
      return '<li><a href="' + it[0] + '" data-i18n="' + it[2] + '">' + it[1] + '</a></li>';
    }).join('') + '</ul>';
  }

  function servicesMega() {
    var cols = SERVICE_GROUPS.map(function (g) {
      return '' +
        '<div class="mega__col">' +
          '<a class="mega__head" href="' + g.href + '">' +
            '<span class="mega__icon">' + icon(g.icon) + '</span>' +
            '<span data-i18n="' + g.i18n + '">' + g.title + '</span>' +
          '</a>' +
          linkList(g.links) +
        '</div>';
    }).join('');

    return '' +
      '<div class="mega mega--wide">' +
        '<div class="mega__grid">' + cols + '</div>' +
        '<div class="mega__foot">' +
          '<span data-i18n="nav.mega.note">Not sure where to start? Book a free 30-minute discovery call.</span>' +
          '<a class="btn btn-gold btn-sm" href="contact.html#consultation">' +
            '<span data-i18n="cta.bookShort">Book a Consultation</span>' + icon('arrow-right') +
          '</a>' +
        '</div>' +
      '</div>';
  }

  var NAV_ITEMS = [
    { id: 'home', href: 'index.html', label: 'Home', i18n: 'nav.home' },
    { id: 'about', href: 'about.html', label: 'About Us', i18n: 'nav.about', mega: '<div class="mega mega--sm">' + linkList(ABOUT_LINKS) + '</div>' },
    { id: 'team', href: 'team.html', label: 'Team', i18n: 'nav.team' },
    { id: 'projects', href: 'success-stories.html', label: 'Success Stories', i18n: 'nav.projects' },
    { id: 'services', href: 'services.html', label: 'Services', i18n: 'nav.services', mega: servicesMega() },
    { id: 'blog', href: 'insights.html', label: 'Insights', i18n: 'nav.blog' },
    { id: 'contact', href: 'contact.html', label: 'Contact Us', i18n: 'nav.contact' }
  ];

  /* ----------------------------------------------------------------------
     4. Header
     ---------------------------------------------------------------------- */
  function header(current) {
    var items = NAV_ITEMS.map(function (item) {
      var isCurrent = item.id === current;
      var cls = 'nav__item' + (item.mega ? ' has-mega' : '') + (isCurrent ? ' is-current' : '');
      var caret = item.mega ? icon('chevron-down') : '';
      var aria = item.mega ? ' aria-haspopup="true" aria-expanded="false"' : '';
      return '' +
        '<li class="' + cls + '">' +
          '<a class="nav__link" href="' + item.href + '"' + aria + (isCurrent ? ' aria-current="page"' : '') + '>' +
            '<span data-i18n="' + item.i18n + '">' + item.label + '</span>' + caret +
          '</a>' +
          (item.mega || '') +
        '</li>';
    }).join('');

    return '' +
      '<a class="skip-link" href="#main" data-i18n="a11y.skip">Skip to main content</a>' +
      '<header class="site-header" id="siteHeader">' +
        '<div class="container header-inner">' +
          brand(false) +
          '<nav class="nav" id="primaryNav" aria-label="Primary">' +
            '<ul class="nav__list">' + items + '</ul>' +
            '<a class="btn btn-gold btn-caps" href="contact.html#consultation">' + icon('calendar') +
              '<span data-i18n="cta.bookNav">Book a Consultation</span></a>' +
          '</nav>' +
          '<div class="header-actions">' +
            '<a class="btn btn-gold btn-sm btn-caps" href="contact.html#consultation">' + icon('calendar') +
              '<span data-i18n="cta.bookNav">Book a Consultation</span></a>' +
            '<div class="lang-switch" role="group" aria-label="Language">' +
              '<button type="button" data-lang="en">EN</button>' +
              '<button type="button" data-lang="ar">AR</button>' +
            '</div>' +
            '<button class="nav-toggle" id="navToggle" type="button" aria-controls="primaryNav" aria-expanded="false" aria-label="Menu">' +
              icon('menu', 'icon--menu') + icon('close', 'icon--close') +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="nav-backdrop" id="navBackdrop" hidden></div>';
  }

  /* ----------------------------------------------------------------------
     5. Footer
     ---------------------------------------------------------------------- */
  var QUICK_LINKS = [
    ['index.html', 'Home', 'nav.home'],
    ['about.html', 'About Us', 'nav.about'],
    ['why-zain.html', 'Why Zain Consulting', 'nav.about.why'],
    ['team.html', 'Team', 'nav.team'],
    ['success-stories.html', 'Success Stories', 'nav.projects'],
    ['services.html', 'Services', 'nav.services'],
    ['insights.html', 'Insights', 'nav.blog'],
    ['contact.html', 'Contact Us', 'nav.contact']
  ];

  var FOOTER_SERVICES = SERVICE_GROUPS.map(function (g) {
    return [g.href, g.title, g.i18n];
  });

  var SOCIALS = [
    ['https://www.linkedin.com/company/zain-consulting', 'linkedin', 'LinkedIn'],
    ['https://www.facebook.com/zainconsulting', 'facebook', 'Facebook'],
    ['https://www.instagram.com/zainconsulting', 'instagram', 'Instagram'],
    ['https://x.com/zainconsulting', 'x-social', 'X']
  ];

  function footerLinks(items) {
    return '<ul class="footer-links">' + items.map(function (it) {
      return '<li><a href="' + it[0] + '" data-i18n="' + it[2] + '">' + it[1] + '</a></li>';
    }).join('') + '</ul>';
  }

  function footer() {
    var socials = SOCIALS.map(function (s) {
      return '<a href="' + s[0] + '" target="_blank" rel="noopener" aria-label="' + s[2] + '">' + icon(s[1]) + '</a>';
    }).join('');

    return '' +
      '<footer class="site-footer">' +
        /* The bridge belongs in the bottom bar — the spread motif carries the home page. */
        '<svg class="footer-bridge" viewBox="0 0 1200 150" fill="none" aria-hidden="true" preserveAspectRatio="none">' +
          '<path d="M0 128h1200" stroke="currentColor" stroke-width="2"/>' +
          '<path d="M40 128C140 34 320 6 470 6s330 28 430 122" stroke="currentColor" stroke-width="2"/>' +
          '<path d="M120 128V74M210 128V50M300 128V32M390 128V20M480 128V16M570 128V22M660 128V36M750 128V56M840 128V82M930 128V110" stroke="currentColor" stroke-width="1.3"/>' +
          '<path d="M470 6v122M470 6l-330 122M470 6l330 122" stroke="currentColor" stroke-width="1.6" opacity=".7"/>' +
          '<path d="M0 140h1200" stroke="currentColor" stroke-width="7" opacity=".45"/>' +
        '</svg>' +
        '<div class="container">' +
          '<div class="footer-main">' +
            '<div class="footer-about">' +
              brand(true) +
              '<p data-i18n="footer.about">Your trusted partner in registration, tendering, business development, training and supply chain support across the Middle East.</p>' +
              '<div class="socials">' + socials + '</div>' +
            '</div>' +
            '<div>' +
              '<h4 class="footer-title" data-i18n="footer.quickLinks">Quick Links</h4>' +
              footerLinks(QUICK_LINKS) +
            '</div>' +
            '<div>' +
              '<h4 class="footer-title" data-i18n="footer.ourServices">Our Services</h4>' +
              footerLinks(FOOTER_SERVICES) +
            '</div>' +
            '<div class="footer-contact-col">' +
              '<h4 class="footer-title" data-i18n="footer.contactUs">Contact Us</h4>' +
              '<ul class="footer-contact">' +
                '<li>' + icon('mail') + '<a href="mailto:info@zainconsulting.com">info@zainconsulting.com</a></li>' +
                '<li>' + icon('pin') +
                  '<span><strong data-i18n="contact.branch.egypt">Egypt</strong>' +
                  '<a class="ltr" href="tel:+20482347812">+2 048 234 7812</a><br>' +
                  '<a class="ltr" href="https://wa.me/201035904464" target="_blank" rel="noopener">+20 10 3590 4464</a></span></li>' +
                '<li>' + icon('pin') +
                  '<span><strong data-i18n="contact.branch.uae">United Arab Emirates</strong>' +
                  '<a class="ltr" href="tel:+971559634349">+971 55 9634349</a></span></li>' +
                '<li>' + icon('calendar') + '<span data-i18n="footer.appointment">Meetings by appointment. We also travel to client sites across the region.</span></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<p class="mb-0">&copy; <span data-year>2026</span> Zain Consulting. <span data-i18n="footer.rights">All Rights Reserved.</span></p>' +
            '<div class="footer-legal">' +
              '<a href="privacy.html" data-i18n="footer.privacy">Privacy Policy</a>' +
              '<a href="terms.html" data-i18n="footer.terms">Terms &amp; Conditions</a>' +
              '<a href="contact.html" data-i18n="nav.contact">Contact Us</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<button class="to-top" id="toTop" type="button" aria-label="Back to top">' + icon('arrow-up') + '</button>';
  }

  /* ----------------------------------------------------------------------
     6. Mount
     This file is loaded as a blocking script directly after <body> so the
     sprite exists before any <use href="#i-..."> in the page is parsed.
     The header and footer can only be mounted once the whole document has
     been parsed, so mounting waits for DOMContentLoaded and then announces
     itself with a zc:ready event. i18n.js and main.js wait for that event
     rather than for DOMContentLoaded — deferred scripts run *before* it,
     which would otherwise leave them binding to a header that is not there.
     ---------------------------------------------------------------------- */
  document.body.insertAdjacentHTML('afterbegin', buildSprite());

  function mount() {
    var headerMount = document.querySelector('[data-component="header"]');
    if (headerMount) {
      headerMount.outerHTML = header(document.body.getAttribute('data-page') || '');
    }

    var footerMount = document.querySelector('[data-component="footer"]');
    if (footerMount) {
      footerMount.outerHTML = footer();
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    window.zcComponentsReady = true;
    document.dispatchEvent(new CustomEvent('zc:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
