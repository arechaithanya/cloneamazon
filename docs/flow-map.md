# Flow map — Amazon.com (recon)

**Status:** Phase 1 in progress  
**Marketplace:** _TBD_  
**Primary persona:** Retail buyer (not seller, not AWS)

Legend: 📷 = screenshot required (see [`recon/CHECKLIST.md`](./recon/CHECKLIST.md))

---

## 1. Discovery

### F01 — Homepage (signed out) 📷 `F01_home_signed-out.png`

**Screenshots:** _pending_

**Notes:**

- Global header: logo, delivery location, search, language, account, returns & orders, cart count.
- Body: hero/carousel, category grids, personalized rails (may be generic when signed out).
- Footer: legal, careers, registry links.

**Rebuild intent:** Header + category rails + “featured” product grids from seed data.

---

### F02–F03 — Search 📷 `F02_search_suggest.png`, `F03_search_results.png`

**Screenshots:** _pending_

**Notes:**

- Typeahead departments, recent searches, trending.
- Results: sponsored row, filters left or top, sort, pagination/infinite scroll.
- Empty state if query has no hits.

**Rebuild intent:** Postgres/Meilisearch text search; sort by price/rating; category filter.

---

### F04–F05 — Category browse & refine 📷 `F04_category_landing.png`, `F05_search_filter_sort.png`

**Screenshots:** _pending_

**Notes:**

- Breadcrumbs, subcategory chips, result count.
- Facets: price, brand, rating, Prime (stub).

**Rebuild intent:** Category pages + query params for sort/filter.

---

### F06–F08 — Product detail (PDP) 📷 `F06_pdp_above-fold.png`, `F07_pdp_variant.png`, `F08_pdp_reviews.png`

**Screenshots:** _pending_

**Notes:**

- Gallery, title, price, list price, availability, buy box (quantity, Add to Cart, Buy Now).
- Variants affect price/ASIN/stock.
- Reviews: histogram, top reviews, verified purchase badge.
- Cross-sell: “Frequently bought together”, “Customers who viewed”.

**Rebuild intent:** Full PDP with variants, stock, seeded reviews; stub recommendations.

---

## 2. Cart

### F09–F12 — Cart & checkout entry 📷 `F09`–`F12`

**Screenshots:** _pending_

**Notes:**

- Mini cart flyout vs full cart page.
- Subtotal, shipping estimate, proceed to checkout.
- Sign-in wall for guests (document behavior).

**Rebuild intent:** Persistent cart (user + guest session merge on login).

---

## 3. Authentication & account

### F13 — Sign up / Sign in 📷 `F13_auth_signup-or-signin.png`

**Screenshots:** _pending_

**Notes:**

- Email/mobile, password, OTP flows vary by region.
- Error states: wrong password, existing account.

**Rebuild intent:** Email + password (or magic link) via auth provider.

---

### F14–F16 — Account hub 📷 `F14`–`F16`

**Screenshots:** _pending_

**Notes:**

- Your Orders, Login & security, Prime, addresses, payment methods, lists.
- Address form fields required for checkout.

**Rebuild intent:** Addresses CRUD; orders list; payment UI stub or Stripe test.

---

## 4. Checkout

### F17–F21 — Checkout pipeline 📷 `F17`–`F21`

**Screenshots:** _pending_

**Notes:**

- Steps: address → delivery speed → payment → review.
- Gift options, coupons (note if shown).
- Order ID on confirmation; email receipt.

**Rebuild intent:** 1–2 page checkout; transactional order create; confirmation page.

**Edge cases to capture:**

- Invalid address
- Out-of-stock between cart and checkout
- Payment failure

---

## 5. Orders & post-purchase

### F22–F23 — Order history 📷 `F22_orders_list.png`, `F23_order_detail.png`

**Screenshots:** _pending_

**Notes:**

- Filter by time range, search orders.
- Detail: items, totals, ship-to, tracking link or status timeline.

**Rebuild intent:** Orders list + detail with static tracking states.

---

## 6. Lists

### F24–F25 — Wish List 📷 `F24_wishlist_add.png`, `F25_wishlist_view.png`

**Screenshots:** _pending_

**Notes:**

- Default list vs multiple lists.
- Move to cart from list.

**Rebuild intent:** Single wishlist per user (MVP).

---

## Optional flows (document in recon)

### Buy Now

_Short notes after optional walkthrough._

### Deals

_Short notes._

### Marketplace (3P seller)

_Short notes — likely **Cut** for MVP._

### Returns

_Short notes — likely **Cut** for MVP._

### Help / customer service

_Short notes — **Stub** FAQ page only._

---

## Happy path (demo script)

For the 5-minute Loom, align recon with this path:

1. Home → search → PDP → add to cart  
2. Sign in → checkout → confirmation  
3. Your Orders → order detail  

Update this section after recon if the live site differs.
