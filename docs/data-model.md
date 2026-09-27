# Data model (MVP)

Derived from Amazon buyer flows; normalized for Postgres + Prisma/Drizzle. Adjust after recon.

## Entity diagram (logical)

```text
User 1──* Address
User 1──* Order
User 1──1 Cart ──* CartLine ──* ProductVariant
User 1──* WishlistItem ──* ProductVariant

Category 1──* Product 1──* ProductVariant
Product 1──* ProductImage
Product 1──* Review (optional link to User)

Order 1──* OrderLine ──* ProductVariant
Order *──1 Address (snapshot)
Payment 1──1 Order
```

## Tables (fields)

### `users`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | PK |
| email | string | unique |
| password_hash | string | or auth provider id |
| name | string | |
| created_at | timestamp | |

### `addresses`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| user_id | uuid | FK |
| full_name, phone | string | |
| line1, line2, city, state, postal_code, country | string | |
| is_default | boolean | |

### `categories`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| name | string | |
| slug | string | unique |
| parent_id | uuid? | tree |

### `products`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| category_id | uuid | |
| title, description | text | |
| brand | string? | |
| rating_avg | decimal | computed or denormalized |
| review_count | int | |

### `product_variants`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| product_id | uuid | |
| sku | string | |
| option_label | string | e.g. "Size M / Blue" |
| price_cents | int | |
| list_price_cents | int? | strike-through |
| stock | int | decrement on order |

### `product_images`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| product_id | uuid | |
| url | string | |
| sort_order | int | |

### `reviews`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| product_id | uuid | |
| user_id | uuid? | null if seeded |
| rating | int | 1–5 |
| title, body | string | |
| verified_purchase | boolean | |

### `carts` / `cart_lines`

- Cart keyed by `user_id` or `session_id` (guest).
- Cart line: `variant_id`, `quantity`.

### `orders`

| Field | Type | Notes |
|-------|------|--------|
| id | uuid | |
| user_id | uuid | |
| status | enum | pending, paid, shipped, delivered, cancelled |
| subtotal_cents, shipping_cents, tax_cents, total_cents | int | |
| shipping_address_snapshot | jsonb | immutable copy |
| placed_at | timestamp | |

### `order_lines`

- `order_id`, `variant_id`, `quantity`, `unit_price_cents`, `title_snapshot`.

### `payments`

- `order_id`, `provider` (stripe_test), `status`, `external_id`.

### `wishlist_items`

- `user_id`, `variant_id`, unique pair.

## Search index (later)

- Denormalize: `product_id`, `title`, `brand`, `category_slug`, `min_price` for full-text.

## Inventory rules (checkout)

1. On checkout start: optional soft hold (TTL) or check stock at place-order.
2. On order success: decrement `stock` in transaction with order insert.
3. On payment failure: no order or mark failed; restore stock.

## Open questions (fill during recon)

- [ ] Guest checkout vs forced sign-in?
- [ ] Does Amazon merge cart on login? (implement merge if yes)
- [ ] Which address fields are required for your marketplace?
