# MindBodyRitual

Wellness e-commerce platform built around three pillars: **Mind**, **Body**, and **Ritual**.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env
# Edit .env with your Supabase + Stripe keys

# 3. Run database migration (requires Supabase/Postgres)
npm run migrate

# 4. Start the dev server
npm run dev
```

Open **http://localhost:3000** to view the site.

> The homepage works without a database. API routes (products, auth, blog) require a running PostgreSQL via Supabase.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + bcryptjs (httpOnly cookies)
- **Payments:** Stripe (CAD)
- **Frontend:** Vanilla HTML/CSS/JS (no framework)
- **Deploy:** GitHub → Railway

## Project Structure

```
mindbodyritual/
├── server.js           # Express app entry point
├── routes/             # API route modules
│   ├── auth.js         # Register, login, logout, profile
│   ├── products.js     # Product listing + categories
│   ├── cart.js         # Cart validation
│   ├── blog.js         # Blog posts
│   ├── contact.js      # Contact form + newsletter
│   └── checkout.js     # Stripe checkout sessions
├── middleware/
│   └── auth.js         # JWT middleware (requireAuth, requireAdmin, optionalAuth)
├── db/
│   ├── index.js        # PostgreSQL pool
│   ├── supabase.js     # Supabase client (public + admin)
│   └── migrate.js      # Schema migration script
└── public/             # Static frontend
    ├── index.html      # 13-section homepage
    ├── css/
    │   ├── main.css    # Theme + layout
    │   └── components.css
    └── js/
        └── app.js      # Client-side interactivity
```
