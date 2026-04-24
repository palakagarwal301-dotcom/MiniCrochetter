# Mini Crochetter

A static handmade crochet shop website (home, shop, workshops, order). Originally hosted on Vercel, now running on Replit.

## Stack
- Static HTML/CSS/JS (`index.html`, `shop.html`, `workshops.html`, `order.html`, `style.css`, `products.js`)
- Node.js + Express (`server.js`) serves the static files and reproduces the Vercel `cleanUrls` + rewrites behavior on port 5000.

## Run
- `npm run dev` (alias for `npm start`) starts the Express server on `0.0.0.0:5000`.
- Workflow `Start application` runs this command.

## Routing
The Express server mirrors the original `vercel.json` config:
- `/shop` → `shop.html`
- `/order` → `order.html`
- `/workshops` → `workshops.html`
- Clean URLs: any extensionless path falls back to `<path>.html` if it exists.
- `/assets/*` is served with long-lived immutable caching; HTML is no-cache.
