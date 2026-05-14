# Twin Shade — Loud. Inclusive. Streetwear.

> Bold fits, co-ords & jumpsuits for every body. XS – 5XL. Based in Jaipur.

---

## What This Is

Twin Shade is a size-inclusive Indian streetwear label built for real bodies. This repository contains the full landing page — a vanilla HTML/CSS/JS build with zero frameworks, zero build steps, and zero compromises on performance or design quality.

Live at: [twinshade.in](https://twinshade.in)  
Instagram: [@twinshade.in](https://instagram.com/twinshade.in)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS (custom properties, grid, flexbox) |
| Scripts | Vanilla ES6 — no frameworks, no bundler |
| Fonts | Google Fonts — Playfair Display + DM Sans |
| Images | Unsplash (dev placeholders) → replace with actual assets |
| Schema | JSON-LD (Organization, BreadcrumbList, Product) |

---

## File Structure

```
twinshade/
├── index.html          # Full landing page markup
├── styles.css          # All styles — critical inline CSS is in index.html <head>
├── main.js             # All JS — modular functions, no build required
├── products.json       # Product data (optional — fallback data is hardcoded in main.js)
├── assets/
│   ├── hero.jpg        # Hero image (mobile)
│   ├── hero-md.jpg     # Hero image (tablet)
│   ├── hero-lg.jpg     # Hero image (desktop)
│   ├── model-1.jpg     # Inclusivity section model images
│   ├── model-2.jpg
│   ├── model-3.jpg
│   ├── story-1.jpg     # Brand story images
│   ├── story-2.jpg
│   ├── insta-1.jpg     # Social mosaic images (1–6)
│   ├── insta-2.jpg
│   ├── insta-3.jpg
│   ├── insta-4.jpg
│   ├── insta-5.jpg
│   ├── insta-6.jpg
│   ├── logo.svg        # Brand logo (used in JSON-LD)
│   └── og-image.jpg    # Open Graph / social share image
└── README.md
```

---

## Sections

| # | Section | ID |
|---|---|---|
| 1 | Header + Search Overlay | `#site-header` |
| 2 | Hero / First Fold | `#hero` |
| 3 | Brand Statement + Marquee | `#brand-statement` |
| 4 | Product Editorial Grid | `#products` |
| 5 | Inclusivity & Fit + Size Tool | `#inclusivity` |
| 6 | Brand Story | `#story` |
| 7 | CTA Strip + Trust Signals | `#cta-strip` |
| 8 | Social Mosaic / Lookbook | `#social` |
| 9 | Footer + Newsletter | `#site-footer` |

---

## Features

- **Size Recommendation Tool** — enter chest, waist, hips in inches and get your Twin Shade size instantly (XS–5XL)
- **Quick View Modal** — product detail without leaving the page
- **Size Guide Modal** — full size chart with accessible table markup
- **Look Builder** — add up to 3 pieces to a saved look (persisted in localStorage)
- **Instagram Lightbox** — swipeable mosaic with keyboard arrow navigation
- **Newsletter Form** — client-side validation, no backend required to wire up
- **Scroll Animations** — IntersectionObserver-based fade-up/left/right, respects `prefers-reduced-motion`
- **Mobile Nav Drawer** — slide-in with overlay, focus management, scroll lock
- **Search Overlay** — full-screen search with keyboard dismiss

---

## Running Locally

No build step. Just serve the files:

```bash
# Option 1 — VS Code Live Server
# Right-click index.html → Open with Live Server

# Option 2 — Python
python -m http.server 5500

# Option 3 — Node
npx serve .
```

Then open `http://127.0.0.1:5500/index.html`

---

## Replacing Placeholder Images

All images in `main.js` under the `IMAGES` object are Unsplash placeholders. Replace them with actual brand assets:

```js
// main.js — top of file
const IMAGES = {
  hero: 'assets/hero.jpg',           // replace URL with local path
  products: [
    'assets/product-1.jpg',          // one entry per product card
    ...
  ],
  models: [...],
  story: [...],
  insta: [...],
};
```

Once assets are in the `/assets/` folder, update each entry from the Unsplash URL to the local path.

---

## Adding Products

Edit or create `products.json` in the root:

```json
[
  {
    "id": 1,
    "name": "Solid Drama Jumpsuit",
    "category": "Jumpsuit",
    "price": "₹2,499",
    "sizes": ["XS","S","M","L","XL","2XL","3XL","4XL","5XL"],
    "badge": "New Drop",
    "description": "Full-length editorial jumpsuit. XS–5XL.",
    "images": ["assets/product-1.jpg"]
  }
]
```

If `products.json` is missing or the fetch fails, `main.js` falls back to the hardcoded product array — so the page never breaks.

---

## SEO Setup

- Meta description, OG tags, and Twitter card are in `<head>`
- JSON-LD schema for Organization, BreadcrumbList, and a sample Product are included
- To verify with Google Search Console, paste the verification `<meta>` tag in `index.html` where the comment placeholder is
- Microsoft Clarity snippet placeholder is also in `<head>`

---

## Instagram Feed (Production)

The social mosaic currently uses static placeholder images. To pull live Instagram posts:

1. Set up Instagram Basic Display API
2. Get a long-lived access token
3. Replace the static `.mosaic-item` HTML in `index.html` with dynamic rendering via the API
4. Token refresh instructions: [Instagram Basic Display API docs](https://developers.facebook.com/docs/instagram-basic-display-api)

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge (last 2) | Full |
| Firefox (last 2) | Full |
| Safari 15+ | Full |
| Mobile Chrome / Safari | Full |
| IE 11 | Not supported |

---

## Known Limitations

- Cart is UI-only — no backend or payment integration in this build
- Newsletter form does client-side validation only — needs a backend endpoint or service like Mailchimp/Klaviyo wired up
- Look Builder uses localStorage — clears if user clears browser data
- No server-side rendering — this is a static build

---

## License

All design, copy, and brand assets © 2025 Twin Shade. All rights reserved.  
Code structure is proprietary to the Twin Shade project.

---

## Contact

For custom orders or sizing queries:  
DM [@twinshade.in](https://instagram.com/twinshade.in) on Instagram

> *Bold. Inclusive. Streetwear. Jaipur → Everywhere.*
