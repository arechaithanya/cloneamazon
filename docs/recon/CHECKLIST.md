# Amazon recon checklist

**Marketplace:** Amazon.in  
**Date:** 2026-09-27  
**Account:** Existing (Chaitanya)

Screenshots: [`../screenshots/`](../screenshots/) — see [`../screenshots/MANIFEST.md`](../screenshots/MANIFEST.md) for rename mapping.

---

## Required — Discovery

| Done | ID | Action | Screenshot file |
|------|-----|--------|-----------------|
| [x] | F01 | Load signed-out homepage | `F01_home_signed-out.jpg` |
| [x] | F02 | Use search bar (suggestions + submit) | `F02_search_suggest.jpg`, `F03_search_results.jpg` |
| [x] | F04 | Open a category from nav or hamburger | `F04_category_landing.jpg` |
| [x] | F05 | Apply sort + one filter on results | `F05_search_filter_sort.png` |
| [x] | F06 | Open a product detail page (PDP) | `F06_pdp_above-fold.png` |
| [x] | F07 | Change variant (size/color) if offered | `F07_pdp_variant.png` |
| [x] | F08 | Scroll reviews / Q&A (or “See all reviews”) | `F08_pdp_reviews.png` |

## Required — Cart

| Done | ID | Action | Screenshot file |
|------|-----|-----|-----------------|
| [x] | F09 | Add to Cart from PDP | `F09_add_to_cart_toast.jpg` |
| [x] | F10 | Open cart, change quantity | `F10_cart_qty.png` |
| [ ] | F11 | Remove item or Save for later (note which) | _not captured_ |
| [x] | F12 | Proceed to checkout (sign-in gate if shown) | `F12_checkout_gate.png` |

## Required — Account & auth

| Done | ID | Action | Screenshot file |
|------|-----|--------|-----------------|
| [x] | F13 | Sign up (new account) OR sign in | `F13_auth_signup-or-signin.png` (+ step2) |
| [x] | F14 | Account menu → Your Account hub | `F14_account_hub.png` |
| [x] | F15 | Addresses: add or view list | `F15_account_addresses.png` |
| [x] | F16 | Payment methods list (no need to add real card) | `F16_account_payments.png` |

## Required — Checkout (stop before pay if needed)

| Done | ID | Action | Screenshot file |
|------|-----|--------|-----------------|
| [x] | F17 | Shipping address step | `F17_checkout_address.png` |
| [ ] | F18 | Delivery option step | _not captured_ |
| [x] | F19 | Payment step | `F19_checkout_payment.png` |
| [x] | F20 | Review order / Place order screen | `F20_checkout_review.png` |
| [ ] | F21 | Order confirmation (if you place) OR note “stopped before place” | _not captured_ |

## Required — Post-purchase

| Done | ID | Action | Screenshot file |
|------|-----|--------|-----------------|
| [x] | F22 | Your Orders list | `F22_orders_list.png` (+ extras) |
| [x] | F23 | Single order detail + tracking UI | `F23_order_detail-tracking.jpg` |

## Required — Lists

| Done | ID | Action | Screenshot file |
|------|-----|--------|-----------------|
| [x] | F24 | Add to Wish List or create list | `F24_wishlist_add.png` |
| [x] | F25 | View list page | `F25_wishlist_view.png` |

## Optional — Document only (screenshot optional)

| Done | ID | Action | Notes file section |
|------|-----|--------|-------------------|
| [x] | F26 | “Buy Now” vs Add to Cart | `flow-map.md` § Buy Now |
| [x] | F27 | Deals / Today’s Deals | `flow-map.md` § Deals |
| [ ] | F28 | Seller storefront (3P) | `flow-map.md` § Marketplace |
| [ ] | F29 | Return item flow (first screen) | `flow-map.md` § Returns |
| [ ] | F30 | Customer service / Help | `flow-map.md` § Help |
