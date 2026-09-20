# Adding an article to Insights

Covers your item **6** — how the articles the team is preparing get onto the site.

You need three things from the writer before you start:

1. The article text **in English and in Arabic**.
2. A headline, an author name, a date and a one-sentence summary.
3. One photograph.

There is no admin panel and no login — the site is plain files, which is why it
is fast and costs nothing to host. Adding an article is: copy one file, fill in
the marked blocks, add a card to the listing page, push.

---

## Step 1 — Prepare the photograph

Put it in `assets/img/` and name it `blog-` plus a short description, all
lowercase with hyphens:

```
assets/img/blog-adnoc-registration.jpg
```

- **Width:** about 1400 pixels. Bigger is wasted; smaller looks soft.
- **Format:** JPEG for photographs. PNG files of photographs are five to ten
  times heavier for no visible gain.
- **Size:** under 200KB. This is the first large thing a reader downloads.

**Never reuse a filename.** If you replace a picture later, give the new file a
new name (`blog-adnoc-registration-v2.jpg`) and update the references. Nothing
here is content-hashed, so a replacement under the same name will keep showing
the old picture to anyone who has already visited the site.

---

## Step 2 — Create the article page

Copy `_new-article-template.html` and rename it. Start the name with
`insights-`, all lowercase, words joined by hyphens:

```
insights-adnoc-registration-2026.html
```

Open your copy and work down it. Every block you need to change is marked
`<<< … >>>` and numbered 1 to 11. There are eleven, and nothing outside them
needs touching.

Both languages live in this one file. Every English block carries
`class="lang-en"` and its Arabic twin `class="lang-ar"`; the site shows whichever
matches the reader's chosen language. **You never edit the translation
dictionary for an article** — that is only for the fixed parts of the site such
as menus and buttons.

Things that catch people out:

- Write `&amp;` instead of a bare `&` in any text. `Oil &amp; Gas`.
- In the share links, spaces in the headline are written `%20`.
- Do not add `dir="rtl"` to the Arabic block. The page already flips direction.
- Keep the English and Arabic structure identical — same number of headings, same
  order. It is the only way the two versions stay in step over time.

---

## Step 3 — Add the card to `insights.html`

Open `insights.html`, find the `<div class="grid grid-3">` block, copy one whole
`<article class="card post-item">…</article>` and paste it as the **first** card
so the newest article appears first. Then change six things:

| In the copied card | Change it to |
| --- | --- |
| `data-category="tender"` | one of `tender`, `bizdev`, `chem`, `energy`, `success` — this is what the filter buttons use |
| `<img src="…">` and its `alt` | your photograph and a plain description of it |
| `<span class="tag" data-i18n="blog.cat.tender">` | the matching category label |
| the two dates in `post-meta` | your date and reading time |
| `<h3 class="card__title"><a href="…">` | your file name and headline |
| `<p class="card__text">` | your one-sentence summary |

The pasted card will still have `data-i18n="post2.date"`-style attributes
pointing at the old article's text. Delete those `data-i18n` attributes and
replace each one with the two-language pair the template uses:

```html
<span class="lang-en">14 April 2026</span><span class="lang-ar">١٤ أبريل ٢٠٢٦</span>
```

A `data-i18n` attribute left in place will overwrite your new text with the old
article's Arabic when a reader switches language. This is the one mistake worth
double-checking.

**The category must match** the one you kept in block 4 of the article page, or
the article will vanish when a reader clicks that filter.

---

## Step 4 — Optional: feature it

- **To make it the featured article** on `insights.html`, update the
  `<article class="featured-post">` block near the top the same way.
- **To show it on the home page**, open `index.html`, find the Insights section
  and update one of the three cards there. Keep that section to three cards —
  more makes the home page long without adding anything.

---

## Step 5 — Add it to `sitemap.xml`

One line, next to the others:

```xml
<url><loc>https://www.zain-consulting.com/insights-adnoc-registration-2026.html</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>
```

This is how Google finds the article. Skipping it means waiting weeks instead of
days.

---

## Step 6 — Check it, then publish

Before pushing, open your new file in a browser and check all four:

- [ ] The photograph appears, and the page is not missing its header or footer.
- [ ] Switching to **العربية** swaps the whole article, and nothing English is
      left behind.
- [ ] The article appears on `insights.html`, and still appears when you click
      its category filter.
- [ ] Narrow the browser window to phone width — the text stays inside the
      screen with no sideways scrolling.

Then commit and push. The site redeploys on its own.

---

## Publishing a news item rather than an article

For short news — an event, an award, a new registration — use the same template
but keep it to three or four paragraphs, set the category to `success`, and skip
the blockquote. There is no separate news section, and adding one for a handful
of short items would cost more than it returns. If news becomes a weekly habit,
that is the point to add a proper **News** category, and it is a small change.

---

## When you send me the articles

Send the text in both languages, the photographs, and for each one: headline,
author, date, category and a one-sentence summary. I will do all six steps and
push them. If any article has only an English version, tell me — I will translate
it, but you should have someone in the team read the Arabic before it goes live.
