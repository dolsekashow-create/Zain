# Company email — creating the addresses and installing them

Covers your items **3** (`ahmed@` and `support@`) and **4** (getting them onto
computers and phones).

> **What I can and cannot do here.** Mailboxes are not part of the website. They
> live with whoever provides email for the `zain-consulting.com` domain, and they
> can only be created by signing in to that provider's admin console with the
> owner's password. I do not have that access and should not have it, so the
> steps below are written for you to follow once. Everything on the website side —
> the address shown on every page — is already done.

---

## 1. Find out where your email is hosted

You need to know this before anything else. Sign in wherever you bought
`zain-consulting.com` (the registrar) and open the **DNS records** for the
domain. Look at the **MX** records:

| MX record points at | Your email provider is |
| --- | --- |
| `*.google.com` / `aspmx.l.google.com` | **Google Workspace** |
| `*.outlook.com` / `*.protection.outlook.com` | **Microsoft 365** |
| `mx.zoho.com` / `mx.zoho.eu` | **Zoho Mail** |
| `mail.zain-consulting.com` or your host's name | **your web host** (cPanel / Plesk / Hostinger / etc.) |
| nothing at all | email is **not set up yet** — see section 2 |

Write the answer down. Every later step depends on it.

---

## 2. If email is not set up yet

Pick one provider for the whole company. Two sensible choices:

- **Google Workspace** — ~$7 per user per month. Gmail interface, which your team
  already knows. Best if people are used to Gmail.
- **Zoho Mail** — free for up to 5 users on one domain, paid from ~$1 per user.
  Best if you want to keep costs near zero.

Sign up, choose "I already own a domain", enter `zain-consulting.com`, and the
provider will give you DNS records (MX, plus SPF/DKIM) to add at your registrar.
Add them exactly as given. Mail starts working within a few hours.

---

## 3. Create the three mailboxes

In your provider's admin console, create:

| Address | Type | Why |
| --- | --- | --- |
| `info@zain-consulting.com` | **mailbox** | The public address. Already published on every page of the website. |
| `ahmed@zain-consulting.com` | **mailbox** | Personal address. |
| `support@zain-consulting.com` | **mailbox or alias** | Support enquiries. |

Where to click:

- **Google Workspace** — admin.google.com → *Directory → Users → Add new user*
  (for a mailbox), or *Apps → Google Workspace → Gmail → Routing → Aliases*
  (for an alias).
- **Microsoft 365** — admin.microsoft.com → *Users → Active users → Add a user*,
  or *Teams & groups → Shared mailboxes* for `support@`.
- **Zoho Mail** — mailadmin.zoho.com → *Users → Add user*, or *Domains → Email
  Aliases*.
- **cPanel** — *Email Accounts → Create*, or *Forwarders* for an alias.

**Mailbox or alias?** A **mailbox** is a real inbox with its own password —
use it when someone signs in to that address directly. An **alias** costs
nothing and just forwards to an existing mailbox — good for `support@` while the
volume is low. You can convert an alias to a mailbox later without losing the
address.

### One thing to decide about `support@`

If more than one person answers support mail, do **not** share one password.
Create it as a **shared mailbox** (Microsoft 365) or a **group / collaborative
inbox** (Google Workspace) instead. Everyone then reads and replies from
`support@` using their own login, and you can see who answered what.

### Capital letters do not matter

`Info@`, `info@` and `INFO@` all reach the same inbox — the part after the `@` is
case-insensitive by standard, and every major provider treats the part before it
that way too. The website uses lowercase `info@zain-consulting.com` throughout,
because lowercase is what people expect to see and what copies cleanly into a
phone.

---

## 4. Install the addresses on computers and phones

**Always use the provider's own setup route first.** It is one screen, it handles
passwords and two-factor sign-in for you, and it keeps working when passwords
change.

### The easy way (recommended for everyone, including the kids)

| Device | What to do |
| --- | --- |
| **iPhone / iPad** | *Settings → Apps → Mail → Mail Accounts → Add Account* → pick **Google** or **Microsoft Exchange** → enter the full address and password. |
| **Android** | *Settings → Passwords & accounts → Add account* → pick **Google** or **Exchange**. Gmail app then shows the account. |
| **Windows** | Open **Outlook** (or the Mail app) → *Add account* → type the full address → it detects the provider and asks for the password. |
| **Mac** | *System Settings → Internet Accounts → Add Account* → **Google** or **Microsoft Exchange**. |
| **Any device, no setup at all** | Just use the web: `mail.google.com`, `outlook.office.com` or `mail.zoho.com`. Nothing to install. |

That is all most people need. Stop here unless a device refuses to connect.

### The manual way (only if automatic setup fails)

Some older mail apps and most cPanel hosts need the server details typed in. Ask
your provider for them, or read them from the provider's own "configure your mail
client" page. They always follow this shape:

| Setting | Incoming (IMAP) | Outgoing (SMTP) |
| --- | --- | --- |
| Server | e.g. `imap.gmail.com` | e.g. `smtp.gmail.com` |
| Port | **993** | **465** |
| Encryption | **SSL/TLS** | **SSL/TLS** |
| Username | the full address, e.g. `ahmed@zain-consulting.com` | same |
| Password | the mailbox password | same |
| Authentication | required | **required** |

Rules that save an hour of guessing:

- Choose **IMAP**, never POP3. IMAP keeps the mail on the server, so the same
  messages appear on the phone, the laptop and the web. POP3 downloads to one
  device and the others see nothing.
- The username is the **whole address**, not just the part before the `@`.
- Ports **993** and **465** with SSL. If a guide offers 143 or 25 without
  encryption, do not use it.
- If Google or Microsoft rejects the password in an older app, you need an
  **app password** from your account's security page, not your normal password.

### Two-factor authentication

Turn it on for every mailbox, starting with `info@` and `ahmed@`. Company email
is the address that can reset your domain, your hosting and your social accounts,
so it is the single most valuable password you own. Both Google and Microsoft
have it under *Security* in the account settings.

---

## 5. After the mailboxes exist

- Send a test message to each of the three addresses from an outside account
  (your Gmail), and reply from each one. Check the reply does not land in spam.
- If `support@` or `ahmed@` should also appear on the website, tell me and I will
  add them to the contact page. I deliberately have **not** published them yet —
  putting a personal address on a public page invites a lot of spam, and that is
  your call to make, not mine.
- Add SPF, DKIM and DMARC records if your provider has not already. They are what
  stop your tender emails being filed as junk by ADNOC's mail server. Every
  provider has a one-page guide, and it is worth the twenty minutes.
