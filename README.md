# 🛒 Amazon Clone

A full-stack Amazon.in-style e-commerce clone built in under 24 hours. Live, deployed, and fully functional.

**Live URL:** [cloneamazon-bay.vercel.app](https://cloneamazon-bay.vercel.app)  
**Repository:** [github.com/arechaithanya/cloneamazon](https://github.com/arechaithanya/cloneamazon)

---

## Demo Credentials

| Field | Value |
|-------|-------|
| Email | `demo@amazon-rebuild.test` |
| Password | `demo1234` |

Sign in at [cloneamazon-bay.vercel.app/login](https://cloneamazon-bay.vercel.app/login)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS 4 |
| **UI Components** | MUI Icons, react-slick (carousels) |
| **Backend** | Next.js API Routes (serverless functions) |
| **Database** | Neon Postgres (serverless) via Prisma ORM |
| **Auth** | HMAC-signed session cookie (bcryptjs for password hashing) |
| **Deployment** | Vercel (edge + serverless) |
| **Fonts** | Poppins via Google Fonts |
| **Agent Capture** | Cursor hooks (`.cursor/hooks.json`) → `.agent-logs/` |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Edge / CDN                    │
│            (Static assets, ISR, Edge caching)           │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              Next.js App Router (Serverless)             │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Pages / UI  │  │  API Routes  │  │  Server      │  │
│  │  (RSC + CSR) │  │  /api/auth   │  │  Components  │  │
│  │              │  │  /api/cart   │  │  (checkout,  │  │
│  │  Clone UI    │  │  /api/clone  │  │  orders,     │  │
│  │  (Amazon     │  │  /api/orders │  │  account)    │  │
│  │  replica)    │  └──────┬───────┘  └──────────────┘  │
│  └──────────────┘         │                             │
└──────────────────────────-│─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│              Neon Postgres (Serverless DB)               │
│                                                         │
│  Users → Addresses → Cart → CartLines → Orders          │
│  Products → Variants → Images → Reviews → Wishlist      │
└─────────────────────────────────────────────────────────┘
```

### Data Flow
- **Browse:** Static clone catalog (JS data files) → product detail pages
- **Cart:** Guest cookie cart → Prisma cart on login (auto-merge)
- **Checkout:** Prisma cart → placeOrder saga → clear cart → order record
- **Auth:** bcrypt verify → HMAC-signed session cookie (HttpOnly, Secure)

---

## Features

### Homepage
- Amazon-style header with logo, delivery address, search, account, cart
- **Live search autocomplete** — results appear as you type (200ms debounce), keyboard navigable
- Hero banner carousel (react-slick)
- Product grid cards with category links
- Multiple product sliders (Today's Deals, Watches, iPhones, Laptops, Headphones)
- **Recommendations section:**
  - Top picks for you (20 products)
  - Related to items you've viewed (7 women's fashion items)
  - Customers who also bought (6 kids' fashion items)
  - Your browsing history

### 📱 Category Pages
| Page | Products |
|------|---------|
| **Mobiles** `/mobiles` | 16 Apple iPhones + Nokia 110 4G |
| **Electronics** `/electronics` | 8 Smartwatches + 7 Headphones + Deals |
| **Home & Kitchen** `/home-kitchen` | 8 Furniture + 8 Kitchen + 4 Décor |
| **Fashion** `/fashion` | 7 Women's Kurtas/Dresses + 6 Kids' Jackets |
| **Computers** `/computers` | 9 Laptops (Dell, Apple, Lenovo, ASUS, HP, MSI, Razer) |

### Product Detail Page (PDP)
- Product image with thumbnail switcher and colour variants
- Price, EMI info, delivery details
- **About this item** — rendered as bullet points
- Shipping badges (Free Delivery, Pay on Delivery, 7 Days Return, Warranty)
- **Customer reviews** — 3 reviews with star ratings
- Add to Cart button → cart
- Buy Now button → checkout
- Add to Wish List link

### Cart
- Guest cart (cookie) — persists without login
- **Guest cart merges** into user account on login
- Quantity update and item removal
- Order subtotal calculation
- Proceed to Checkout

### Auth
- Register new account (name, email, password)
- Login with email + password
- **Account dropdown** on hover — shows user name, links to Account/Orders/Wishlist, Sign Out
- Session stored as HMAC-signed HTTP-only secure cookie
- Protected routes redirect to login with `?next=` parameter

### Checkout & Orders
- Requires login (guest redirected with return URL)
- Delivery address from account
- Simulated payment (no real card needed)
- **Order confirmation** with green banner
- Full order history at `/orders`
- Individual order detail with tracking steps

### Prime Video Page
- Standalone page at `/prime-video` with its own header/footer
- "Welcome to Prime Video" hero section
- Movie rentals section
- Prime Video Channels grid (12 channels)
- Sign in / Join Prime CTAs

### Account
- Address book (add, edit, delete, set default)
- Order history
- Wishlist

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── auth/           # login, register, logout, me
│   │   ├── cart/           # cart CRUD
│   │   ├── clone/cart/     # clone product → Prisma cart sync
│   │   ├── checkout/       # place order
│   │   └── search/         # autocomplete suggestions
│   ├── CartPage/           # Cart UI
│   ├── ProductPaga/[id]/   # Product Detail Page
│   ├── mobiles/            # Category pages
│   ├── electronics/
│   ├── home-kitchen/
│   ├── fashion/
│   ├── computers/
│   ├── prime-video/
│   ├── checkout/
│   ├── orders/
│   ├── account/
│   └── login/ register/
├── clone/
│   ├── Components/         # Header, NavBar, SearchBar, Footer, etc.
│   ├── Pages/              # Home, ProductPaga, CartPage, category pages
│   └── Data/               # Product catalog data files
├── lib/                    # Prisma client, auth, cart service, orders
└── components/             # Shared UI components
prisma/
├── schema.prisma           # Postgres schema
└── seed.ts                 # Demo data seeder
.agent-logs/                # Auto-captured AI session logs (Cursor hooks)
CAPTURE-TEST.md             # Agent capture verification
```

---

## Local Development

```bash
git clone https://github.com/arechaithanya/cloneamazon.git
cd cloneamazon
npm install

# Add environment variables
cp .env.example .env
# Fill in DATABASE_URL, DIRECT_URL, SESSION_SECRET

# Push schema and seed
npx prisma db push
npx prisma db seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)


*Built by [Chaithanya Reddy](https://github.com/arechaithanya) for the 8x assignment.*
