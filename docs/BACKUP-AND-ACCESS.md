# Backups, and where the passwords live

Covers your item **7**.

---

## 7.1 — Backup of the complete website

**Done.** You have a dated zip on your Desktop:

```
D:\Desktop\zain-website-backup-YYYY-MM-DD.zip
```

It holds every page, every stylesheet and script, all 31 images, the documents in
`docs/`, the original client photographs, **and** the full change history — every
version of every file since the site was started, with the reason for each change.
Unzip it anywhere and you have a working site; open `index.html` and it runs with
no installation.

### There are already three copies

A backup on one Desktop is not a backup. You have:

1. **This zip** — on your machine. Put a copy on a USB drive or in Google Drive.
2. **GitHub** — `github.com/dolsekashow-create/Zain`. Every change ever made,
   permanently. This is the master copy.
3. **The live host** — serving the current version.

Any one of the three can rebuild the other two.

### Making a fresh zip later

Two ways, whichever suits you:

- **From GitHub, no tools needed** — open the repository, click the green **Code**
  button, then **Download ZIP**. This gives you the current files (without the
  change history), which is all you need to restore the site.
- **Ask me** — I make a dated archive including the full history in a few
  seconds.

Worth doing after any round of changes you would not want to redo from memory.

---

## 7.2 and 7.3 — Domain and hosting passwords

**I cannot give you these, and it is worth being clear about why.** They are not
stored in the website and they were never handed to me. A username and password
only exist inside the account of whoever registered the domain and whoever set up
the hosting. There is no copy anywhere in the site's files, so there is nothing
for me to look up — and a password that an assistant could retrieve from a
codebase would be a serious problem in itself.

Here is exactly where to get each one.

### The domain (`zain-consulting.com`)

The **registrar** is whoever you paid for the domain — GoDaddy, Namecheap,
Hostinger, an Egyptian or UAE reseller, or an IT person who bought it for you.

- Search your email (including `zainconsulting2002@gmail.com`) for
  **"zain-consulting.com"**. The purchase receipt and the renewal reminders name
  the registrar and the account address.
- Or look the domain up at `lookup.icann.org` — the public record names the
  registrar even when the owner details are private.
- Then go to that registrar's site and use **Forgot password** on the account
  email. If the email on the account is not one you control, you will need the
  person who bought it to transfer it.

### The hosting

The site is a static site configured for **Vercel** (`vercel.json` in the project
sets this up). Vercel accounts sign in **with GitHub** — so:

- If the site is on Vercel, sign in at `vercel.com` with the GitHub account that
  owns `github.com/dolsekashow-create/Zain`. There is no separate hosting
  password to find.
- Check your email for a "Deployment ready" or "Welcome to Vercel" message to
  confirm which account it is under.

### Two things to fix while you are in there

1. **Put everything in one place.** Domain, hosting, GitHub, the five social
   accounts and the three mailboxes should all be reachable from one company
   email you control — `info@zain-consulting.com`, not a personal Gmail. Right
   now they are spread across `zainconsulting2002@gmail.com` and whoever bought
   the domain. The day someone leaves or loses a phone, that spread is what
   costs you the domain.

2. **Write them down once, properly.** Use a password manager (Bitwarden is free,
   1Password is ~$3/month) with one shared vault for the company. Not a
   spreadsheet, and not a note on a phone.

**A list I should not hold.** Please do not send me the passwords — not for the
domain, not for the hosting, not for the mailboxes. I do not need any of them to
work on the site: everything I change goes through GitHub, which is already
connected. Anything that genuinely needs an account password is something you
should do yourself, from your own screen.

---

## What a complete handover list looks like

For your own records, so nothing is discovered missing later. Fill it in
yourself, in your password manager:

| Item | Where | Account email | Who has access |
| --- | --- | --- | --- |
| Domain `zain-consulting.com` | registrar | | |
| DNS records | usually the registrar | | |
| Hosting | Vercel | | |
| Source code | GitHub `dolsekashow-create/Zain` | | |
| Email provider | see `docs/EMAIL-SETUP.md` | | |
| `info@` / `ahmed@` / `support@` | email provider | | |
| LinkedIn / Facebook / Instagram / X / Telegram | see `docs/SOCIAL-SETUP.md` | | |
| Logo and photograph masters | in the repository, plus the original drop folder | | |

Two names per row, never one. A single point of access is the most common way a
small company loses its own domain.
