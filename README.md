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
| `index.html` | Home | Hero, trust strip, Your Journey to the Market, What We Do, philosophy, why us, success story, insights, CTA |
| `about.html` | About Us | Story, Vision, Mission, Values (anchors: `#story`, `#vision`, `#mission`, `#values`) |
| `why-zain.html` | Why Zain Consulting | Four value propositions, the six-step methodology graphic, brand value-proposition set |
| `team.html` | Team | Network-of-specialists banner + 7 profiles with brief, core expertise and credentials |
| `services.html` | Services | 4 practice areas, the technical sub-services team, and the 5-step How We Work visual |
| `success-stories.html` | Success Stories | One detailed story + three summary cards |
| `insights.html` | Insights | Featured post, category filter, 6 posts, newsletter block |
| `insights-post.html` | Article | Full article template, written in both languages |
| `contact.html` | Contact Us | Form with validation, Egypt + UAE branches, hours, FAQ accordion |
| `privacy.html` / `terms.html` | Legal | Bilingual policy templates |
| `404.html` | Not found | Used automatically by GitHub Pages |

Service anchors: `services.html#tender-qualification`, `#business-development`,
`#training-coaching`, `#supply-chain`, `#technical-support`.

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
├── index.html · about.html · team.html · services.html · success-stories.html
├── insights.html · insights-post.html · contact.html · privacy.html · terms.html · 404.html
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
(`home`, `about`, `team`, `projects`, `services`, `blog`, `contact`).

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

1. Copy `insights-post.html` to e.g. `blog-pricing-strategy.html` and replace the two `.prose` blocks.
2. Add a card to the grid in `insights.html`, copying an existing `<article class="card post-item">`.
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

## Brand assets

| File | Used for |
|---|---|
| `assets/img/logo-mark.png` | Mark only (hand, growth bars, Eye of Horus), transparent. Site header and footer. |
| `assets/img/logo-zain.png` | Full stacked lockup — mark, "ZAIN CONSULTING", slogan. For decks, letterheads, social. |
| `assets/img/favicon.svg` | Eye of Horus on navy — browser tab icon, vector. |
| `assets/img/logo.svg` | Earlier wordmark, kept only as a fallback reference. |

`logo-mark.png` is cut out of the studio's official Eye-of-Horus master (the one supplied on a dark
navy field). The background was removed with a colour-temperature flood fill — the artwork is warm
gold, the field is cool navy — so the gold keeps its full opacity and the engraved detail inside the
eye stays intact. If a new master arrives, replace this one PNG and nothing else changes.

The header lockup is assembled in `components.js` (`brand()`): the mark image plus the company
name and slogan as live text, so the slogan stays translatable and stays crisp at any size.

### Replacing an image

Nothing here is content-hashed, so **give a replaced image a new filename** — otherwise browsers
and the CDN keep serving the copy they already have. `service-tender-qualification-v2.jpg` carries
its `-v2` for exactly that reason. Logos referenced from `components.js` are handled instead by
bumping `ASSET_V` there, which appends `?v=N` to their URLs.

### Page banner image

Every inner page banner (`.page-hero`) uses the same branded boardroom photograph, set once in
`assets/css/style.css`:

```css
.page-hero { --page-hero-img: url('../img/page-banner.jpg'); --page-hero-pos: 60% 42%; }
```

Change that one line to change every banner. To give a single page its own picture, set the
variable on that section only — the path is then relative to the HTML file:

```html
<section class="page-hero" style="--page-hero-img:url('assets/img/service-supply-chain.jpg')">
```

A navy wash sits over the photo so white headings keep roughly 6:1 contrast. If you swap in a
much lighter image, deepen the `linear-gradient` alphas in `.page-hero::before` to match.

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

The newsletter form in `insights.html` (`newsletterForm()`) works the same way.

---

## Before you go live

- [ ] Confirm the contact details. `info@zainconsulting.com`, the Egypt numbers
      (`+2 048 234 7812`, `+20 10 3590 4464`) and the UAE number (`+971 55 9634349`) appear in
      `components.js` (footer), `contact.html`, `privacy.html` and `terms.html`.
- [ ] Create the LinkedIn, Instagram, Facebook and YouTube accounts on zainconsulting2002@gmail.com,
      then replace the placeholder URLs in `components.js` (`SOCIALS`). Every team card already
      points its LinkedIn icon at the company page and its mail icon at info@zainconsulting.com.
- [ ] Replace the stories in `success-stories.html` with real engagements, and publish client names
      only with written permission.
- [ ] Have `privacy.html` and `terms.html` reviewed by legal counsel — they are drafted templates,
      not legal advice.
- [ ] Put the real domain into `sitemap.xml` and `robots.txt`.
- [ ] Connect the contact form (see above).

---

## Deploying to Vercel

This is a static site with no `package.json`, so Vercel must **not** be left on a framework
preset. `vercel.json` in the repository root already sets `"framework": null` with no build
command, which is what makes the deploy work.

When importing the repository, set **Application Preset → Other** before pressing Deploy. On an
existing project that failed with *"No Next.js version detected"*, go to
**Settings → Build and Deployment → Framework Preset → Other**, leave Build Command and Install
Command empty, keep Output Directory empty (or `.`), then **Redeploy**.

`404.html` is served automatically for unknown paths.

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
