# Bio-Green Technologies — E-commerce Site

A dynamic Next.js storefront for **Dr. TEA** and **Dr. COFFEE** — built with the
App Router, TypeScript and Tailwind CSS. Includes a product catalog, cart,
checkout (order placement, no payment gateway yet), and a wholesale/bulk
inquiry form for retailers and distributors.

## What's included

- **Product catalog** — `/`, `/products/dr-tea`, `/products/dr-coffee`
  Full specs, nutrition facts, ingredients and benefits sourced from the
  product labels and spec sheets.
- **Cart** — `/cart` — client-side cart (persisted to `localStorage`),
  supports any quantity per line for bulk personal orders.
- **Checkout** — `/checkout` → `/order-confirmation` — captures customer +
  delivery details and writes a pending order via `POST /api/orders`.
  **No payment is collected on this site yet** — per project scope, orders
  are captured as pending requests for your team to confirm and collect
  payment manually (bank transfer / COD / UPI, whatever you use).
- **About** — `/about` — company story, formulation philosophy, contact.
- **Wholesale / Bulk inquiries** — `/wholesale` — a B2B contact form for
  retailers, clinics, gyms, and distributors wanting to stock the
  products. Submits to `POST /api/wholesale-inquiries`.

## Why no franchise / commission registration

The original promotional material described a multi-tier "franchise"
program with entry buy-ins, 20-level team commissions, and weekly payouts
that scale with recruitment. That structure has the hallmarks of a
pyramid / money-circulation scheme, and I'm not able to build a
registration or payout system for it. What's here instead is a
legitimate e-commerce + wholesale-inquiry flow: customers buy product
(including in bulk), and businesses can apply to stock product through
an ordinary B2B contact form — no recruitment tiers, no commission
ladder.

If you want a genuine **affiliate/referral** feature later (e.g. "refer a
friend, get 10% off your next order" — a flat, one-level, real-purchase-
based discount), that's a normal and buildable e-commerce feature,
distinct from the tiered structure in the original flyer.

## Getting started locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
src/
  app/
    page.tsx                 → Homepage
    products/[slug]/page.tsx → Dynamic product detail page
    cart/page.tsx            → Cart
    checkout/page.tsx        → Checkout form (order placement)
    order-confirmation/      → Post-order confirmation
    about/page.tsx           → About Bio-Green
    wholesale/page.tsx       → Bulk/wholesale inquiry form
    api/
      orders/route.ts            → POST: create an order
      wholesale-inquiries/route.ts → POST: create a wholesale inquiry
  components/                → Header, Footer, ProductCard, AddToCartPanel, IngredientLedger
  context/CartContext.tsx    → Client-side cart state (localStorage-backed)
  data/products.ts           → Product catalog (edit this to change prices, copy, specs)
  lib/store.ts                → Order/inquiry persistence (see note below)
```

## ⚠️ Before deploying to Vercel: swap the storage layer

`src/lib/store.ts` currently writes orders and wholesale inquiries to JSON
files in a local `data/` folder. **This works for local development but
will not persist on Vercel** — serverless functions have an ephemeral,
read-only filesystem at runtime, so writes will either fail or vanish
between requests.

Before going live, swap `src/lib/store.ts` for a real database. Easiest
options that pair well with Vercel:

- **Vercel Postgres** (native integration, minimal setup)
- **Supabase** (Postgres + generous free tier)
- **PlanetScale** (MySQL-compatible)

The functions in `store.ts` (`saveOrder`, `getOrders`, `saveWholesaleInquiry`,
`getWholesaleInquiries`) are the only things that need to change
implementation — every page/API route that calls them stays the same.

You'll also want to:
- Add an admin view (or just query the DB directly / use email notifications)
  so your team actually sees new orders and inquiries as they come in.
- Wire up email notifications (e.g. Resend, SendGrid) on order/inquiry
  submission so you're not manually checking a database.

## Adding payment later

When you're ready to take payments online, the natural next step for the
Indian market is **Razorpay** (supports cards, UPI, netbanking, wallets).
The checkout page is structured so that adding this later means:
1. Creating a Razorpay order in `POST /api/orders` instead of just saving it.
2. Adding the Razorpay checkout widget to the client-side checkout flow.
3. Verifying the payment signature server-side before marking the order
   as paid.

## Editing product info, prices, or copy

Everything about Dr. TEA and Dr. COFFEE — pricing, pack sizes, nutrition
facts, ingredients, benefits — lives in `src/data/products.ts`. Edit that
file and the product pages, homepage cards, and cart all update
automatically.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — no config needed for the build itself.
4. **Before your first real orders come in**, complete the database swap
   described above.
