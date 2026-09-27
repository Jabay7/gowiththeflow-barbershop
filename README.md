# Go With The Flow Barbershop

Website for **Go With The Flow Barbershop**, 713 Mission Ave Ste D, Oceanside, CA 92054.
Live at **https://gowiththeflowbarbershop.com** via GitHub Pages. Every push to `main` redeploys.

```
barbershop/
  index.html          the whole page — every bit of text lives here
  css/styles.css      all styling (colors + fonts are variables at the top)
  js/main.js          mobile menu, scroll reveal, "open now" badge, footer year
  favicon.svg         barber-pole tab icon
  assets/img/         photos (self-hosted, never hotlinked)
  assets/fonts/       Rubik / Hind / Fraunces, self-hosted
  CNAME               tells GitHub Pages which domain to serve
```

## Run it locally

```bash
cd barbershop
python -m http.server 8777
# then open http://127.0.0.1:8777
```

## Design

Dark charcoal + cream with barber-pole red and brass gold. Rubik 900 uppercase for headings,
Hind for body, Fraunces for small accent labels. All tokens are at the top of `css/styles.css`.

## Where the facts came from

Address, phone, hours, rating and amenities were taken from the shop's Google Business
Profile. Booking is by phone or walk-in (no booking app, by request). Instagram is
@gowiththeflowbarbershop.

## Editing common things

| Change | Where |
|---|---|
| Hours | The `<table class="hours">` in `index.html` **and** the `HOURS` object at the top of `js/main.js` (drives the "open now" badge) |
| Phone / address | Search `index.html` for `575-1268` and `Mission Ave` |
| Services | The `<ul class="services">` list in `index.html` |
| Photos | Replace files in `assets/img/` keeping the same filenames |
| Colors | `:root` variables at the top of `css/styles.css` |
| Rating | The `4.6` / `42 reviews` text in the hero and reviews section |

## Photos

`theshop.jpg` is the real shop sign. The hero is free-license stock from Unsplash (photo
EW_rqoSdDes); no attribution required. Swap in real shop photos when you have them.

The photos in `assets/img/` are stock placeholders. Swap them for real shop photos with the
same filenames and the site updates with no code change. `hero-shop.jpg` should be landscape (about 3:2); `about-1.jpg` and `service-beard-grooming.jpg`
work best in portrait.

## Privacy

No analytics, no cookies, no third-party scripts, no contact form. A strict
Content-Security-Policy in `index.html` blocks anything that is not served from this site.
Visitors only reach Google Maps or Instagram if they click a link. See `PRIVACY.md`.
