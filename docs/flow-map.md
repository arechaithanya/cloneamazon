# Flow map — Amazon.in (recon)

**Status:** Phase 1 — recon captured (screenshots in [`screenshots/`](./screenshots/))  
**Marketplace:** Amazon.in (Great Indian Festival promos visible)  
**Account:** Signed-in as Chaitanya; delivery pin **Hyderabad 500081**  
**Primary persona:** Retail buyer (not seller, not AWS)

Legend: 📷 = screenshot in `docs/screenshots/`

---

## 1. Discovery

### F01 — Homepage (signed out) 📷 [`F01_home_signed-out.jpg`](./screenshots/F01_home_signed-out.jpg)

**Screenshots:** `F01_home_signed-out.jpg`

**Notes:**

- Signed-out home: category tiles (kitchen, beauty, fashion, toys, PC), festival banners, “Deals for you” rails.
- Header: logo, “Deliver to” location, search (All categories), language, **Hello, sign in**, Returns & Orders, cart.
- Heavy merchandising: spin-to-win / cashback promo, iQOO and Levi’s festival cards.

**Rebuild intent:** SSR home with category grid + deal rails from seed data; location chip in header (stub geolocation).

---

### F02–F03 — Search 📷 [`F02_search_suggest.jpg`](./screenshots/F02_search_suggest.jpg), [`F03_search_results.jpg`](./screenshots/F03_search_results.jpg), [`F03_search_results-grid.jpg`](./screenshots/F03_search_results-grid.jpg)

**Screenshots:** above + grid variant

**Notes:**

- **F02:** Autocomplete dropdown — “Keep shopping for” image chips (vitamins, projector, monitors, helmets), recent queries (`jordan shoes for man`, `monitor`, `helmet…`), clear (X) per suggestion.
- **F03:** Query `jordan shoes for man` — ~683 results, sort **Featured**, sponsored ASIAN shoe row, left filters (gender, brands: Nike, Jordan, etc.), right **cart subtotal** sticky summary while browsing.
- **Grid:** Product cards with price, rating, sponsored labels; filters narrow results.

**Rebuild intent:** Search API + debounced suggest endpoint; results page with sort + brand filter; optional mini-cart summary on desktop.

---

### F04–F05 — Category browse & refine 📷 [`F04_category_landing.jpg`](./screenshots/F04_category_landing.jpg), [`F05_search_filter_sort.png`](./screenshots/F05_search_filter_sort.png)

**Screenshots:** above

**Notes:**

- **F04:** Category-style landing (signed-out home tiles) — same pattern as department entry from home.
- **F05:** Results with **left facet panel** (reviews, brands, discount, pay on delivery, price slider) and active chips (Low top, Training, Running, etc.).

**Rebuild intent:** Category slug pages; query-string filters; facet counts from DB.

---

### F06–F08 — Product detail (PDP) 📷 [`F06_pdp_above-fold.png`](./screenshots/F06_pdp_above-fold.png), [`F07_pdp_variant.png`](./screenshots/F07_pdp_variant.png), [`F08_pdp_reviews.png`](./screenshots/F08_pdp_reviews.png)

**Screenshots:** above

**Notes:**

- **F06:** Jordan high-top — limited-time deal, ₹12,915, **Only 5 left in stock**, Pollen/White/Black, size row (9.5 UK selected), Add to Cart + **Buy Now**, deliver to named user + pin, Add to Wish List, right rail recommendations.
- **F07:** Same PDP — **Product details** table (material, closure, sole, style, country), **About this item** bullets, size/color selectors.
- **F08:** Reviews section — histogram, customer images, Q&A / Rufus prompts (stub in MVP).

**Rebuild intent:** PDP with variant SKU swap, stock badge, buy box; seeded reviews; stub “Ask” chips.

---

## 2. Cart

### F09–F12 — Cart & checkout entry

| ID | Screenshot | Notes |
| --- | --- | --- |
| F09 | [`F09_add_to_cart_toast.jpg`](./screenshots/F09_add_to_cart_toast.jpg) | Interstitial **Added to cart** + subtotal ₹28,586, **Proceed to Buy (4 items)**, cross-sell carousel |
| F10 | [`F10_cart_qty.png`](./screenshots/F10_cart_qty.png) | Full **Shopping Cart** — 4 shoe line items, qty dropdown, delete, subtotal, Proceed to Buy |
| F11 | _missing_ | Save for later / remove — **not captured** (see [`screenshots/MANIFEST.md`](./screenshots/MANIFEST.md)) |
| F12 | [`F12_checkout_gate.png`](./screenshots/F12_checkout_gate.png) | Checkout entry / sign-in or address step (captured in flow) |

**Rebuild intent:** Cart page + post-add interstitial; guest merge on login; proceed triggers auth if needed.

---

## 3. Authentication & account

### F13 — Sign in 📷 [`F13_auth_signup-or-signin.png`](./screenshots/F13_auth_signup-or-signin.png), [`F13_auth_signup-or-signin-step2.png`](./screenshots/F13_auth_signup-or-signin-step2.png)

**Notes:**

- Amazon sign-in: email/mobile → OTP/password steps (two screens captured).
- Post-login header shows **Hello, Chaitanya**.

**Rebuild intent:** Email/password or magic link; session JWT.

---

### F14–F16 — Account hub 📷 [`F14_account_hub.png`](./screenshots/F14_account_hub.png), [`F15_account_addresses.png`](./screenshots/F15_account_addresses.png), [`F16_account_payments.png`](./screenshots/F16_account_payments.png)

**Notes:**

- **F14:** **Your Account** grid — Orders, Login & security, Prime, addresses, payments, lists, etc.
- **F15:** **Your Addresses** — add tile + saved address (Chaitanya, Hyderabad), Edit / Remove / Set as Default, related product row.
- **F16:** **Wallet** — Amazon Pay balance, **Your credit/debit cards**, **Your bank accounts** (UPI), rewards — India-specific.

**Rebuild intent:** Account hub page; address CRUD; payments page stub (Stripe test + “Amazon Pay” copy optional).

---

## 4. Checkout

### F17–F21 — Checkout pipeline

| ID | Screenshot | Notes |
| --- | --- | --- |
| F17 | [`F17_checkout_address.png`](./screenshots/F17_checkout_address.png) | Select / confirm delivery address |
| F18 | _missing_ | Delivery speed step — **not captured** (upload labeled F18 was order tracking → see F23) |
| F19 | [`F19_checkout_payment.png`](./screenshots/F19_checkout_payment.png) | Payment method selection |
| F20 | [`F20_checkout_review.png`](./screenshots/F20_checkout_review.png) | Review order / place order |
| F21 | _missing_ | Order confirmation — not in batch |

**Edge cases observed (orders, not checkout UI):**

- **Payment failed** order with shampoo combo — payment method error, not charged (`F22_orders_not-yet-shipped.png`).
- **Order cancelled** — same payment error copy on grocery order (`F22_orders_list-delivered-cancelled.png`).

**Rebuild intent:** Combined checkout steps; saga on place order; surface payment failure state on order row.

---

## 5. Orders & post-purchase

### F22–F23 — Order history 📷 [`F22_orders_list.png`](./screenshots/F22_orders_list.png), [`F22_orders_not-yet-shipped.png`](./screenshots/F22_orders_not-yet-shipped.png), [`F22_orders_list-delivered-cancelled.png`](./screenshots/F22_orders_list-delivered-cancelled.png), [`F23_order_detail-tracking.jpg`](./screenshots/F23_order_detail-tracking.jpg)

**Notes:**

- Tabs: **Orders**, Buy Again, **Not Yet Shipped**; filter “past 3 months”; search orders.
- **Open orders:** multiple sneaker orders with **Arriving** dates, Track package, Write review, Buy it Again.
- **Delivered:** grocery order with perishable note; **Cancelled** with payment cancellation message.
- **F23:** Order detail — **Arriving Friday** stepper (Ordered → Shipped → Out for delivery → Delivered), View order details, browsing-history carousel.

**Rebuild intent:** Orders list with status badges; detail page with static tracking stepper.

---

## 6. Lists

### F24–F25 — Wish List 📷 [`F24_wishlist_add.png`](./screenshots/F24_wishlist_add.png), [`F25_wishlist_view.png`](./screenshots/F25_wishlist_view.png)

**Notes:**

- **F24:** Modal **Add to your list** — default name “Shopping List”, private lists, Create/Cancel.
- **F25:** **Shopping List** — ASICS GEL-1130, size/color, Add to Cart, Move, **In Cart** badge, invite/share.

**Rebuild intent:** One default list; add from PDP; list page with move-to-cart.

---

## Optional Flows (Recon Notes)

### Buy Now

* **Flow & Mechanics:** One-click purchase bypasses the standard multi-step cart lifecycle. It pulls default shipping address and payment method directly from user profile, issues a stock hold, and instantly creates an order.
* **Scope Decision:** **Include (Light)** — Share underlying checkout endpoint/Saga execution with standard checkout to save effort.
* **Recon:** Visible on PDP next to Add to Cart (F06); not separately screenshotted.

### Deals

* **Flow & Mechanics:** Dedicated landing page filtering products tagged with dynamic discount rules, countdown timers, and limited-stock claim progress bars.
* **Scope Decision:** **Include (Simplified)** — Implement a basic category/tag filter (`is_deal: true`) on the existing search/catalog service.
* **Recon:** Great Indian Festival banners on home (F01) and header strip on search (F03).

### Marketplace (3P Seller)

* **Flow & Mechanics:** Third-party merchant onboarding, multi-seller item attribution on single PDP, commission/payout engines, and seller inventory portals.
* **Scope Decision:** **Cut for MVP** — Limit products to single-vendor/platform-fulfilled items.

### Returns

* **Flow & Mechanics:** Post-delivery return window validation, label generation, carrier webhook sync, inspection workflow, and automated refund processing.
* **Scope Decision:** **Cut for MVP** — Display static return policy link; omit automated processing engine.

### Help / Customer Service

* **Flow & Mechanics:** Automated chatbot, ticket routing, live agent queue, and dynamic troubleshooting flows.
* **Scope Decision:** **Stub Page Only** — Static FAQ accordions and stubbed contact form for MVP.

---

## Happy Path (Demo Script - 5-Minute Loom Walkthrough)

*Aligned to recon (sneakers / search) rather than generic headphones.*

```
[0:00 - 1:30] Step 1: Discovery to Cart
 ├── 1. Home (F01) → Search "jordan shoes for man" (F02–F03)
 ├── 2. Open PDP (F06) → pick size (F07)
 └── 3. Add to Cart (F09) → Cart with multiple items (F10)

[1:30 - 3:15] Step 2: Authentication & Checkout
 ├── 1. Proceed to checkout (F12) — sign-in if needed (F13)
 ├── 2. Address (F17) → Payment (F19) → Review (F20)
 └── 3. Place order (F21 TBD in build) → confirmation page

[3:15 - 5:00] Step 3: Post-Purchase
 ├── 1. Your Orders (F22) — open / in-transit items
 ├── 2. Order detail + tracking stepper (F23)
 └── 3. Optional: Wish list add (F24–F25)
```
