# Go With The Flow Barbershop

A local, editable copy of the site Porkbun generated for **gowiththeflowbarbershop.com**,
rebuilt as plain HTML/CSS/JS.

```
barbershop/
  index.html          the whole page — every bit of text lives here
  css/styles.css      all styling (colors + fonts are variables at the top)
  js/main.js          mobile menu, scroll reveal, contact form
  favicon.svg         browser tab icon
  assets/img/         photos (downloaded, not hotlinked)
  assets/fonts/       Rubik / Hind / Fraunces, self-hosted
```

## Run it

```bash
cd barbershop
python -m http.server 8777
# then open http://127.0.0.1:8777
```

Or just double-click `index.html` — everything works offline except nothing, because
there is nothing external to load.

---

## What this is, and how it relates to the Porkbun site

Porkbun's builder made a **WordPress** site using an Extendify template. This folder is a
faithful rebuild of that design — same fonts (Rubik / Hind / Fraunces), same palette, same
sections, same copy — with no WordPress, no plugins, and no third-party requests.

You now have two versions and can pick either:

| | Porkbun WordPress | This folder |
|---|---|---|
| Edit by | clicking in their AI builder | editing `index.html` |
| Hosting | Porkbun Cloud for WordPress | anywhere (GitHub Pages, Porkbun static, Netlify) |
| Third-party requests | SimplyBook.me, Gravatar, Unsplash, Extendify | none |
| Updates / security patches | WordPress + plugins to keep patched | nothing to patch |

Nothing here has been pushed anywhere. The live domain still serves the Porkbun WordPress
site behind its "Coming Soon" gate.

---

## Placeholders to replace

Porkbun's generator filled the page with demo content. Search `index.html` for each:

- `206-555-0100` — demo phone number (appears 5×, plus `js/main.js`)
- `123 Main Street` / `Your City, ST 00000` — footer address
- `Person 3` / `Job Title, Company Name` — testimonial byline
- The four service descriptions ("This service is designed to…") — generic filler
- Opening hours in the Booking section — invented, set your real ones
- `assets/img/*.jpg` — Unsplash stock. Drop your own photos in with the same
  filenames and they appear immediately, no code change.

## Turning the contact form on

The form does not send anywhere yet — by design, so it can't silently swallow messages.
Open `js/main.js`, and set:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Get that endpoint free at formspree.io. Until it is set, the form tells visitors to call
instead. There is a hidden honeypot field that catches most spam bots without a captcha.

## Booking

The Porkbun original embedded a **SimplyBook.me demo widget** — a third-party script that
sees every visitor and sets its own cookies, and which was showing "This is a demo
SimplyBook.me widget" on the live site. It is replaced here with call/text buttons.

If you want real online booking later, link *out* to the provider in a new tab rather than
embedding their script — visitors only reach the third party if they actually click.

## Deploying

Served by GitHub Pages from the `main` branch, root folder. Every push redeploys.

To put it on the real domain, add GitHub's Pages A records in Porkbun DNS and commit a
`CNAME` file containing `gowiththeflowbarbershop.com`.

While the demo phone number and address are still in place, `index.html` carries
`<meta name="robots" content="noindex, nofollow">` so search engines skip it. Delete that
line when the real details go in.
