# amzss1 design reference (Figma export)

Source folder: `~/Downloads/amzss1` (copied to [`amzss1/`](./amzss1/) with stable names).

Screens are ordered as you specified (1–35). Files `36-*-extra-unlabeled.png` are additional exports in the folder after #35—review if any are checkout/order variants.

## Screen index

| # | File | Screen | MVP |
|---|------|--------|-----|
| 1 | `01-account-verify-email.png` | Account verify email | **Stub** (copy + “code sent”; no real OTP) |
| 2 | `02-account-password.png` | Account password | **Build** (align `/login`) |
| 3 | `03-business-account-id.png` | Business account ID | **Cut** |
| 4 | `04-free-amazon-business-account.png` | Free Amazon Business | **Cut** |
| 5 | `05-manage-content-and-devices.png` | Manage content & devices | **Cut** |
| 6 | `06-membership-and-subscription.png` | Membership & subscription | **Stub** link from account |
| 7 | `07-your-seller-account.png` | Your seller account | **Cut** (marketplace) |
| 8 | `08-subscribe-and-save.png` | Subscribe & Save | **Cut** |
| 9 | `09-prime-video.png` | Prime Video | **Cut** |
| 10 | `10-prime-membership.png` | Prime membership | **Stub** badge + marketing |
| 11 | `11-recommendations.png` | Recommendations | **Build** (PDP carousel — partial) |
| 12 | `12-keep-shopping.png` | Keep shopping | **Build** (home rails) |
| 13 | `13-your-wishlist.png` | Your wishlist | **Build** `/wishlist` |
| 14 | `14-your-orders.png` | Your orders | **Build** `/orders` |
| 15 | `15-your-account.png` | Your account | **Build** `/account` |
| 16 | `16-home-page.png` | Home page | **Build** `/` — **UI ref Block C** |
| 17 | `17-all-categories.png` | All categories | **Build** category grid / nav |
| 18 | `18-search-items.png` | Search items | **Build** `/search` |
| 19 | `19-languages.png` | Languages | **Stub** header EN only |
| 20 | `20-account-list.png` | Account list (dropdown) | **Build** header account menu |
| 21 | `21-departments-mega-menu.png` | Departments mega menu | **Stub** simplified nav |
| 22 | `22-revamp-home-in-style.png` | Revamp your home | **Seed** category + home tile |
| 23 | `23-kitchen-appliances.png` | Kitchen & appliances | **Seed** category landing |
| 24 | `24-home-decor-improvement.png` | Home decor / improvement | **Seed** category landing |
| 25 | `25-appliances-up-to-50-off.png` | Appliances up to 50% off | **Deals** rail (`is_deal`) |
| 26 | `26-headphones.png` | Headphones category | **Seed** (expand catalog) |
| 27 | `27-amazon-brands-and-more.png` | Amazon brands & more | **Stub** home rail |
| 28 | `28-automotive-essentials.png` | Automotive essentials | **Seed** optional |
| 29 | `29-home-improvement-essentials.png` | Home improvement essentials | **Seed** optional |
| 30 | `30-product-dress-pdp.png` | Product (dress) PDP | **Build** `/product/[slug]` — **UI ref** |
| 31 | `31-product-dress-pdp-alt.png` | Product PDP (alt) | Same — reviews / scroll |
| 32 | `32-cart-page.png` | Cart page | **Build** `/cart` — **UI ref** |
| 33 | `33-proceed-to-buy.png` | Proceed to buy | **Build** `/checkout` |
| 34 | `34-sign-in-page.png` | Sign in | **Build** `/login` — **UI ref** |
| 35 | `35-create-account.png` | Create account | **Build** `/register` — **UI ref** |

## What “end-to-end” means for the assignment

Your pack covers **account hub + Prime + seller + business + many category merchandising pages**. The **shipped MVP** should still follow [`scope.md`](../scope.md):

**Demo path (build to match screens 16 → 18 → 30 → 32 → 33 → 14):**

Home → Search → PDP → Cart → Checkout/Proceed → Orders (+ 13 Wishlist, 15 Account).

**Use amzss1 for visual polish (Phase 4 Block C):**

- Header: logo, deliver-to, search, account list (20), language (19 stub)
- Home: category tiles (17, 22–29), keep shopping (12), recommendations (11)
- PDP / cart / auth: 30–35

**Do not build now:** 3–10, seller (7), Prime Video (9), full mega menu (21) unless time remains.

## Relation to live recon

Live Amazon.in screenshots remain in [`screenshots/`](../screenshots/) for **behavior** (payments, tracking, India copy). **amzss1** is the **layout/branding** reference (often .com-style).
