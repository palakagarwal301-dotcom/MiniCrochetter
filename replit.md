# Mini Crochetter

A handmade crochet shop website (home, shop, workshops, order) with a built-in cart, RSVP flow, and a small admin page for managing workshop sessions. Originally hosted on Vercel, now running on Replit.

## Stack
- Static HTML/CSS/JS pages: `index.html`, `shop.html`, `workshops.html`, `order.html`, `admin.html`, `style.css`, `products.js`
- Node.js + Express (`server.js`) serves the static files and reproduces Vercel's `cleanUrls` + rewrites on port 5000.

## Run
- `npm run dev` (alias for `npm start`) starts the Express server on `0.0.0.0:5000`.
- Workflow `Start application` runs this command.

## Routing
The Express server mirrors the original `vercel.json`:
- `/shop` → `shop.html`
- `/order` → `order.html`
- `/workshops` → `workshops.html`
- `/admin` → `admin.html`
- Clean URLs: any extensionless path falls back to `<path>.html` if it exists.
- `/assets/*` is served with long-lived immutable caching; HTML is no-cache.

## Features
- **Home** — hero, featured products strip with one-tap "Add to cart", live cart counter in nav, customer reviews.
- **Shop** — category tabs, search, sort (Featured / Price asc / Price desc / Name / Newest), product detail modal with quantity stepper, slide-in cart drawer with line items, qty +/−, remove, subtotal, and Checkout link.
- **Order** — auto-detects the cart in `localStorage` and renders a "Your Cart" summary; the WhatsApp message includes the itemized cart and subtotal. Cart is cleared after submit.
- **Workshops** — lists upcoming sessions with seat availability, RSVP modal that captures name, phone, seats, and notes, then opens WhatsApp pre-filled with the workshop, date, mode, and total.
- **Admin (`/admin`)** — edit/add/delete/reset/export workshop sessions; saved to browser `localStorage` under `mc_sessions`. Workshops page reads from this store first, falling back to defaults.

## Storage keys
- `mc_cart` — shopping cart (array of `{id, name, price, img, qty}`)
- `mc_sessions` — workshop sessions edited via `/admin`
