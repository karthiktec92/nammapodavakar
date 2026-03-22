# StyleHub — Clothing E-Commerce Website

A fully functional, production-ready clothing e-commerce website built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools required. Deploy anywhere in seconds.

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, categories, featured products, promo timer, testimonials, newsletter |
| Shop | `shop.html` | Full product catalog with filters, sorting, pagination, grid/list toggle |
| Product | `product.html` | Detail view with gallery, size/colour selector, add to cart, reviews, related items |
| Cart | `cart.html` | Cart management, quantity editor, coupon codes, order summary |
| Checkout | `checkout.html` | 3-step checkout (Shipping → Payment → Review) with order confirmation |
| About | `about.html` | Brand story, values, team profiles |
| Contact | `contact.html` | Contact form, live FAQ accordion, location/social info |

## Features

- ✅ 16 clothing products across Men, Women, Kids & Accessories
- ✅ Persistent cart with LocalStorage (survives page refresh)
- ✅ Wishlist with LocalStorage
- ✅ Slide-in cart drawer on every page
- ✅ Category, price, size & badge filters
- ✅ Sort by: Featured / Price / Rating / Newest
- ✅ Grid & list view toggle
- ✅ Pagination (9 products per page)
- ✅ Product image gallery with thumbnail switcher
- ✅ Size selector & colour picker
- ✅ Coupon code system (STYLE15, SAVE10, WELCOME20)
- ✅ 3-step checkout with form validation
- ✅ Order confirmation screen
- ✅ Live countdown sale timer
- ✅ Toast notifications
- ✅ FAQ accordion
- ✅ Fully responsive (mobile-first)
- ✅ Sticky header with scroll effect
- ✅ Mobile hamburger menu

---

## File Structure

```
e-site/
├── index.html          ← Home page
├── shop.html           ← Product catalog
├── product.html        ← Product detail
├── cart.html           ← Shopping cart
├── checkout.html       ← Checkout flow
├── about.html          ← About page
├── contact.html        ← Contact & FAQ
├── css/
│   └── style.css       ← Complete stylesheet
└── js/
    ├── data.js         ← All product & category data
    ├── cart.js         ← Cart, wishlist, toast, drawer
    ├── app.js          ← Home page logic
    ├── shop.js         ← Shop filters & pagination
    └── product.js      ← Product detail logic
```

---

## Hosting Guide

### Option 1 — GitHub Pages (Free)
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source → main branch / root**
3. Your site is live at `https://yourusername.github.io/e-site/`

### Option 2 — Netlify (Free, Custom Domain)
1. Go to [netlify.com](https://www.netlify.com)
2. **Drag & drop** the `e-site` folder onto the Netlify dashboard
3. Instantly live at a `*.netlify.app` URL
4. To add a custom domain: **Site Settings → Domain Management → Add custom domain**

### Option 3 — Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. In this folder run: `vercel`
3. Follow the prompts — live in under 60 seconds

### Option 4 — Cloudflare Pages (Free)
1. Push to GitHub / GitLab
2. Connect at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Build command: *(leave empty — static site)*
4. Output directory: `/`

### Option 5 — Any Web Host (cPanel / FTP)
1. Zip the entire `e-site` folder
2. Upload and extract into `public_html/` on your server
3. Navigate to your domain — it works immediately

---

## Connecting to a Real Domain

1. Purchase a domain (e.g., from Namecheap, GoDaddy, Google Domains)
2. Deploy via Netlify / Vercel / Cloudflare Pages
3. In your domain registrar, update the **nameservers** to point to your hosting provider
4. Add the domain in the hosting platform dashboard — SSL is usually auto-issued (Let's Encrypt)

---

## Customisation

### Change the store name
Search & replace `StyleHub` across all HTML files.

### Add / edit products
Open `js/data.js` and add a new object to the `PRODUCTS` array following the existing schema.

### Change colours / theme
Edit the CSS variables at the top of `css/style.css`:
```css
:root {
  --primary:   #1d1d1d;   /* main dark colour */
  --secondary: #c8956c;   /* accent / brand colour */
  --accent:    #e8d5c4;   /* light accent */
}
```

### Enable real payments
Integrate [Stripe.js](https://stripe.com/docs/js) or [PayPal JS SDK](https://developer.paypal.com/sdk/js/) in `checkout.html` to handle real transactions.

### Add a backend
Connect to services like:
- **Firebase** — Firestore for orders & inventory
- **Supabase** — PostgreSQL + Auth
- **Strapi** — Headless CMS for product management
- **Snipcart** — Drop-in cart for static sites

---

## Browser Support
Chrome, Firefox, Safari, Edge (all modern versions). IE not supported.

---

## Coupon Codes (Demo)
| Code | Discount |
|---|---|
| `STYLE15` | 15% off |
| `SAVE10` | 10% off |
| `WELCOME20` | 20% off |

---

© 2026 StyleHub
