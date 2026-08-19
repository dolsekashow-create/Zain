# Zain Consulting — Corporate Website

A complete, bilingual (English / Arabic) corporate website for **Zain Consulting**, a Middle East
consulting firm working in supplier registration, tender qualification, business development,
training and supply chain support.

Built as a plain static site — HTML, CSS and vanilla JavaScript, no build step, no dependencies.
Drop it on any web host or GitHub Pages and it runs.

---

## Pages

| File | Page | Notes |
|---|---|---|
| `index.html` | Home | 8 sections: hero, trust bar, services, philosophy, why us, case study, insights, CTA |
| `about.html` | About Us | Story, Vision, Mission, Core Values (anchors: `#story`, `#vision`, `#mission`, `#values`) |
| `team.html` | Our Team | 9 team members |
| `services.html` | Services | 4 practice areas in depth + the delivery process (anchors below) |
| `projects.html` | Case Studies | One detailed case study + three summary cards |
| `blog.html` | Blog | Featured post, category filter, 6 posts, newsletter block |
| `blog-post.html` | Article | Full article template, written in both languages |
| `contact.html` | Contact Us | Form with validation, contact details, map, FAQ accordion |
| `privacy.html` / `terms.html` | Legal | Bilingual policy templates |
| `404.html` | Not found | Used automatically by GitHub Pages |

Service anchors: `services.html#tender-qualification`, `#business-development`,
`#training-coaching`, `#supply-chain`.

---

## Running it locally

Any static server works. With Node installed:

```bash
npx serve .
```

Or open `index.html` directly in a browser — everything works from the file system too,
including the icon sprite and the language switch.

---

## Project structure

```
.
├── index.html · about.html · team.html · services.html · projects.html
├── blog.html · blog-post.html · contact.html · privacy.html · terms.html · 404.html
├── assets/
│   ├── css/
│   │   ├── style.css      Design tokens, layout, header, footer, buttons, cards
│   │   ├── pages.css      Section and page specific components
│   │   └── rtl.css        Arabic / right-to-left overrides
│   ├── js/
│   │   ├── components.js  Icon sprite + header (mega menu) + footer, injected on every page
│   │   ├── i18n.dict.js   Arabic dictionary
│   │   ├── i18n.js        Language switching, direction, persistence
│   │   └── main.js        Nav, mega menus, reveals, counters, filters, accordion, forms
│   └── img/               Photography, logo, favicon
├── docs/design-reference.jpg   The approved homepage mockup
├── robots.txt · sitemap.xml · .nojekyll
```

### How a page is assembled

Each page contains only its own content. The header and footer are injected by
`assets/js/components.js`, so navigation, the mega menu and the footer are edited in **one place**
and update everywhere.

Script order matters and is the same on every page:

```html
<script src="assets/js/i18n.dict.js" defer></script>
<script src="assets/js/i18n.js" defer></script>
<script src="assets/js/main.js" defer></script>
...
<body data-page="home">
<script src="assets/js/components.js"></script>
```

`components.js` is deliberately a blocking script at the top of `<body>` — it injects the SVG icon
sprite before the page's `<use href="#i-...">` references are parsed. It mounts the header and
footer on `DOMContentLoaded` and then fires a `zc:ready` event; `i18n.js` and `main.js` wait for
that event rather than for `DOMContentLoaded`, because deferred scripts run *before* it.

`data-page` on `<body>` tells the header which nav item to mark as current
(`home`, `about`, `services`, `projects`, `blog`, `contact`).

---

## Editing content

### Text and translations

English wording lives in the HTML. Every translatable element carries a `data-i18n` key, and
`assets/js/i18n.dict.js` holds the Arabic for the same key:

```html
<h2 data-i18n="home.services.title">What We Do</h2>
```
```js
'home.services.title': 'ماذا نقدم',
```

To change the English, edit the HTML. To change the Arabic, edit the dictionary. To add a new
string, give the element a new key and add that key to the dictionary — if a key is missing, the
site simply keeps the English, it does not break.

Attributes use `data-i18n-placeholder`, `data-i18n-aria` and `data-i18n-content`.

Long-form pages (the article, Privacy, Terms) carry both languages inline instead, as
`<div class="prose lang-en">` and `<div class="prose lang-ar">` blocks — easier to maintain than
paragraph-length dictionary entries.

The chosen language is stored in `localStorage` under `zc-lang`, and a small inline script in each
`<head>` applies it before first paint so there is no flash of the wrong direction.

### Navigation and the mega menu

Everything is in `assets/js/components.js`:

- `SERVICE_GROUPS` — the four service columns of the Services mega menu
- `ABOUT_LINKS` — the About dropdown
- `NAV_ITEMS` — the top-level nav
- `QUICK_LINKS`, `SOCIALS` — footer links and social profiles

### Adding a blog post

1. Copy `blog-post.html` to e.g. `blog-pricing-strategy.html` and replace the two `.prose` blocks.
2. Add a card to the grid in `blog.html`, copying an existing `<article class="card post-item">`.
3. Set `data-category` on the card to one of `tender`, `bizdev`, `chem`, `energy`, `success` so the
   category filter picks it up.

### Colours, spacing and type

All tokens are at the top of `assets/css/style.css`:

```css
--navy-800: #0C2340;   /* primary brand */
--gold-500: #C99B3F;   /* accent */
--container: 1220px;
--section-y: 104px;
--font-head: 'Poppins', …;   --font-ar: 'Cairo', …;
```

Changing a token restyles the whole site.

---

## Connecting the contact form

`contact.html` validates on the client and then shows a success message — **no data is sent
anywhere yet**. Pick a service and wire it up in one of these ways.

**Formspree / Web3Forms** — the simplest option. Give the form an action and let it post normally:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
```

then delete the `e.preventDefault()` / success-message block at the end of the `submit` handler in
`assets/js/main.js` (`contactForm()`), keeping the validation above it.

**Your own endpoint** — keep the handler and replace the success block with a `fetch()`:

```js
fetch('/api/contact', { method: 'POST', body: new FormData(form) })
  .then(function () { success.classList.add('is-visible'); form.reset(); });
```

The newsletter form in `blog.html` (`newsletterForm()`) works the same way.

---

## Before you go live

- [ ] Replace the contact details — `info@zainconsulting.com`, `+971 50 123 4567` and the Business
      Bay address appear in `components.js` (footer) and `contact.html`.
- [ ] Point the social links in `components.js` (`SOCIALS`) at the real profiles, and the LinkedIn
      buttons in `team.html` at each person's own profile.
- [ ] Add real team photos: replace `<span class="member__initials">XX</span>` with
      `<img src="assets/img/team/name.jpg" alt="Full name">`. The bios are placeholders written from
      each job title — have the team confirm them.
- [ ] The trust strip on the home page shows the sectors served (Oil & Gas, Petrochemicals, Energy &
      Utilities, Government Tenders). If you want client or partner logos there instead, swap them in
      at the marked comment in `index.html` — but only for organisations that have authorised you to
      display their mark.
- [ ] Replace the case studies in `projects.html` with real engagements, and publish client names
      only with written permission. The "50+ companies / 90% win rate / ISO" figures on the home
      page should be ones you can evidence.
- [ ] Update the map coordinates in `contact.html` to the real office.
- [ ] Have `privacy.html` and `terms.html` reviewed by legal counsel — they are drafted templates,
      not legal advice.
- [ ] Put the real domain into `sitemap.xml` and `robots.txt`.
- [ ] Connect the contact form (see above).

---

## Deploying to GitHub Pages

```bash
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
The site is served at `https://USER.github.io/REPO/`. `.nojekyll` is already included so that
Jekyll does not interfere, and `404.html` is picked up automatically.

For a custom domain, add a `CNAME` file containing the domain and point the DNS at GitHub.

---

## Notes

- **Accessibility** — skip link, keyboard-accessible mega menus, visible focus rings,
  `aria-expanded` / `aria-current` state, labelled form fields with inline errors, and a
  `prefers-reduced-motion` rule that disables animation.
- **Performance** — no frameworks, no bundler. Fonts come from Google Fonts; images are lazy-loaded
  below the fold. The photography is the largest cost: compressing the JPEGs in `assets/img/` (and
  serving WebP) is the single biggest win if you need faster loads.
- **RTL** — the layout uses logical CSS properties throughout, so Arabic mirrors correctly.
  Avoid `translateX(%)` for anything positional: percentage translations resolve along the inline
  axis and are not dependable once direction flips. Use logical insets or margins instead.
- **Browser support** — current Chrome, Edge, Firefox and Safari.

---

## بالعربية — ملخص سريع

موقع كامل لشركة Zain Consulting، ثنائي اللغة (إنجليزي / عربي) مع دعم كامل للاتجاه من اليمين لليسار،
مبني بـ HTML و CSS و JavaScript عادي بدون أي مكتبات أو خطوة بناء.

- **التشغيل محليًا:** افتح `index.html` مباشرة، أو شغّل `npx serve .`
- **تعديل النصوص الإنجليزية:** من ملفات الـ HTML مباشرة.
- **تعديل النصوص العربية:** من `assets/js/i18n.dict.js` — كل مفتاح مقابل نصه العربي.
- **تعديل القائمة العلوية والفوتر والميجا مينيو:** من `assets/js/components.js` — مكان واحد يظهر في كل الصفحات.
- **تعديل الألوان والخطوط والمسافات:** من متغيرات `:root` في أول `assets/css/style.css`.
- **نموذج التواصل:** يتحقق من البيانات لكنه لا يرسلها بعد — راجع قسم *Connecting the contact form* أعلاه.
- **قبل النشر:** راجع قائمة *Before you go live* — بيانات التواصل، صور الفريق، قصص النجاح الحقيقية،
  إحداثيات الخريطة، ومراجعة الصفحات القانونية.
