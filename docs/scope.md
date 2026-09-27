# MVP scope — Amazon rebuild

Decisions for the 24h build. Revisit after Phase 1 recon; change rows if screenshots prove otherwise.

| Area | Decision | Rationale |
|------|----------|-----------|
| Marketplace | Single retailer (no 3P sellers) | Cuts seller portal, buy-box competition |
| Region | One currency + one country | No tax/VAT matrix |
| Payments | Stripe test mode or “simulate pay” | Ship live URL without PCI scope |
| Catalog | Seeded DB (50–200 SKUs) | No scraping Amazon |
| Search | DB + optional Meilisearch later | Text + category + sort first |
| Prime | **Stub** (badge + copy) | Not building subscription billing |
| Recommendations | **Stub** (same-category carousel) | No ML pipeline |
| Reviews | **Build** (seeded + display) | Core PDP trust pattern |
| Gift wrap / coupons | **Cut** | Rarely needed for demo |
| Returns / RMA | **Cut** | Document only in recon |
| Subscribe & Save | **Cut** | |
| Alexa / Video / Ads | **Cut** | Different products |
| Admin | **Build** minimal seed script + optional `/admin` | Faster than manual SQL |

## Build (must work in demo)

- [x] Global layout: search, cart badge, account menu (cart count Phase 3)
- [x] Home, category, search results, PDP
- [ ] Cart (qty, remove)
- [ ] Auth: sign up, sign in, sign out
- [ ] Address book
- [ ] Checkout → order placed → confirmation
- [ ] Orders list + order detail
- [ ] Wishlist (add/remove/view)
- [ ] Responsive pass (mobile header + cart)

## Stub (visible, minimal logic)

- [ ] Prime / fast shipping messaging
- [ ] “Customers also viewed” on PDP
- [ ] Payment methods page (UI; checkout uses one test method)
- [ ] Tracking status (enum: Processing → Shipped → Delivered)

## Cut (explicitly out)

- Multi-vendor catalog and seller accounts
- Real logistics / carrier APIs
- Full account settings (2FA, business account, etc.)
- Internationalization
- Ads and sponsored products
- Live chat support

## “Better than original” (pick 1–2)

- [x] Fewer checkout steps with clear progress
- [x] Strong empty/error states (cart, search, OOS) — include **payment failed** on order row (seen in recon)
- [ ] Accessible focus order on search + cart

## Optional flows (from recon — see `flow-map.md`)

| Flow | MVP decision |
|------|----------------|
| Buy Now | Include (light) — same checkout backend as cart |
| Deals / festival | Include (simplified) — `is_deal` tag + banner |
| Marketplace 3P | Cut |
| Returns | Cut — static policy link |
| Help | Stub FAQ only |
