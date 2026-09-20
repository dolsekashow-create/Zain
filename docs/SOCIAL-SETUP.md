# Social pages — creating them and linking them to the site

Covers your item **5**.

You have created the accounts on `zainconsulting2002@gmail.com`. Two jobs remain:
turn each one into a **company page** (not a personal profile), and connect it to
the website in both directions.

---

## Part 1 — What I have already done on the website side

| Done | What it means |
| --- | --- |
| **Telegram added** | The footer and the contact page now show five platforms: LinkedIn, Facebook, Instagram, X and Telegram. |
| **Share buttons on articles now work** | They used to link to our own profiles, which did nothing. They now open the platform's composer with the article's link and headline already filled in — LinkedIn, X, Facebook, Telegram, WhatsApp and email. |
| **Share cards on every page** | Every one of the 12 pages now carries the tags that decide how it looks when posted. Paste a link into LinkedIn or WhatsApp and you get the page title, the summary and a photograph instead of a bare grey link. |
| **Company record for Google** | `index.html` now carries a structured record of the company — name, logo, slogan, email, both phone numbers, languages, countries served. |

## Part 2 — What only you can do

### Create a company page, not a profile

This matters. A personal profile cannot run ads, has no analytics, and cannot be
handed to a colleague later. On each platform:

| Platform | Where to create the company page |
| --- | --- |
| **LinkedIn** | linkedin.com/company/setup/new — choose **Company**. This is the important one for B2B tender work. |
| **Facebook** | facebook.com/pages/create — choose **Business or Brand**. |
| **Instagram** | Create the account, then *Settings → Account type → Switch to Professional account → Business*. Link it to the Facebook page. |
| **X** | A normal account is fine; fill in the profile and website field. |
| **Telegram** | Create a **Channel** (for announcements) rather than a group, and set a public link such as `t.me/zainconsulting`. |

Fill the same details on all five, word for word:

- **Name:** Zain Consulting
- **Tagline:** Your Bridge to Major Markets
- **About:** Supplier registration, tender qualification, business development,
  training and supply chain support for companies entering major Middle East
  markets.
- **Website:** `https://www.zain-consulting.com`
- **Email:** `info@zain-consulting.com`
- **Industry:** Business Consulting and Services
- **Logo:** `assets/img/logo-mark.png` (square, for the avatar)
- **Cover image:** `assets/img/hero-meeting.jpg` or `assets/img/philosophy-bridge.jpg`

### Then send me the five real addresses

The site currently uses **placeholder** links that I guessed, e.g.
`facebook.com/zainconsulting`. Once the pages exist, send me the five real URLs —
copy them from your browser's address bar while viewing each page — and I will
put them in. There are three places, and I will do all of them in one pass:

1. `assets/js/components.js` → `SOCIALS` (the footer on every page)
2. `contact.html` → the social row
3. `index.html` → the `sameAs` list in the company record, which is what tells
   Google the pages and the website are the same company

Until then the icons point at addresses that may not exist.

---

## Part 3 — Linking back from social to the site

On each page, put `https://www.zain-consulting.com` in the **website** field —
not only in a post. That single field is what search engines read as a
confirmed connection.

Two extras worth doing:

- **Instagram** allows one link only. Point it at the home page, or at
  `contact.html#consultation` during a campaign.
- **LinkedIn** lets you add a **custom button** ("Visit website"). Use it, and
  point it at `contact.html#consultation` — the consultation form, not the home
  page. It is the shortest route from interest to an enquiry.

---

## Part 4 — Checking it works

After the real URLs are in and the site is redeployed, paste a page link into
each debugger. They also clear the platform's cache, which is what you need when
you change a page's image or title and the old one keeps appearing:

| Platform | Tool |
| --- | --- |
| LinkedIn | `linkedin.com/post-inspector` |
| Facebook | `developers.facebook.com/tools/debug` |
| X | Post a link in a draft and look at the preview |
| Telegram / WhatsApp | Send the link to yourself |

If a preview shows no image, the cause is almost always a **relative** image
path. Every page here already uses full `https://…` paths, which is exactly what
these crawlers require.

---

## Part 5 — Posting the articles

When an article goes live, do not paste the text into LinkedIn. Post a short
comment of your own plus the **link** — that is what brings readers to the site,
where they can reach the consultation form. The article's own share buttons do
this correctly, so the quickest route is: open the article, click the platform's
icon, add a sentence, post.
