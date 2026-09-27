# Amazon-Scale E-Commerce — Target Architecture

North-star architecture for a hyperscale e-commerce platform (microservices, events, distributed data). Use as the long-term target; the 24h challenge MVP may be a deliberate subset (modular monolith + Postgres + optional Redis).

## 1. High-Level Overview

Microservices behind an API Gateway, event-driven backbone for async workflows (orders, notifications, analytics).

```
[ Web App / Mobile App ]
             │
             ▼
      [ Cloudflare CDN ] (Edge Caching, DDoS Protection)
             │
             ▼
      [ API Gateway ] (Authentication, Rate Limiting, Routing)
             │
 ┌───────────┼────────────────────┬────────────────────┐
 ▼           ▼                    ▼                    ▼
[ Auth Service ] [ Catalog Service ] [ Cart/Checkout ] [ Order/Payment ]
 (OAuth2/JWT)    (Elasticsearch)      (Redis Cluster)  (Saga Engine)
      │              │                    │                    │
      └──────────────┴─────────┬──────────┴────────────────────┘
                               ▼
                   [ Event Bus (Apache Kafka) ]
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                  ▼
     [ Inventory Svc ]  [ Search Svc ]    [ Notification Svc ]
```

## 2. Core Microservices

| Service | Primary Function | Tech Stack | Primary Database |
| --- | --- | --- | --- |
| **User & Auth** | Registration, auth, address book, profile | Node.js / Go | PostgreSQL |
| **Product Catalog** | Listings, categories, attributes, variations, media | Go / Java | MongoDB / PostgreSQL |
| **Search & Discovery** | Full-text search, suggestions, facets | Python / Go | Elasticsearch / OpenSearch |
| **Cart & Session** | Cart, temporary reservation | Go / Node.js | Redis Cluster |
| **Order Management** | Order creation, state, history | Java (Spring Boot) | PostgreSQL |
| **Payment** | Gateways (Stripe, Razorpay, PayPal), webhooks | Go / Java | PostgreSQL |
| **Inventory & Fulfillment** | Stock tracking, warehouse reservation | Java / Go | PostgreSQL / DynamoDB |
| **Recommendation** | Also-bought, personalized feed | Python (FastAPI) | Neo4j / Redis / Pinecone |
| **Review & Rating** | Reviews, verified purchase | Node.js / Go | Cassandra / PostgreSQL |
| **Notification** | Email, SMS, push | Node.js | Redis + RabbitMQ |

## 3. Critical Workflows

### Browsing & search

1. Client → API Gateway → Search Service (Elasticsearch index fed async from catalog).
2. Media from CDN (CloudFront/Cloudflare) backed by object storage (S3).

### Cart & inventory hold

1. Cart in Redis keyed by `user_id` or `session_token`.
2. At checkout, Inventory Service places **idempotent hold** (e.g. 15 minutes TTL).

### Checkout saga (orchestration)

```
[ Checkout Orchestrator ]
   ├─► 1. Reserve Inventory
   ├─► 2. Process Payment
   ├─► 3. Create Order
   └─► 4. Clear Cart & Notify

Compensation: payment failure → release hold, mark order FAILED.
```

## 4. Data Storage

- **PostgreSQL:** ACID — users, payments, orders.
- **MongoDB (optional):** Flexible catalog attributes.
- **Elasticsearch:** Search, fuzzy match, aggregations.
- **Redis:** Cart, hot keys, flash-sale counters.
- **Cassandra / DynamoDB:** High-write paths (reviews, clickstream) at scale.
- **S3:** Images, invoices, seller docs.

## 5. Scale & HA

- ALB/NGINX → Kubernetes (HPA).
- Kafka for `OrderPlaced` and downstream consumers.
- CDN edge cache + Redis app cache.

## 6. Recommended Stack (full build)

- **Frontend:** Next.js, Tailwind, Zustand/RTK.
- **Gateway:** Kong or Traefik; gRPC inter-service; REST/GraphQL to clients.
- **Observability:** Prometheus/Grafana, ELK, OpenTelemetry/Jaeger.

## Implementation notes (engineering reality)

- Start with **one deployable** with clear module boundaries; split services when load or team boundaries demand it.
- Prefer **one catalog store** (usually Postgres JSONB or normalized schema) before Mongo + Postgres duplication.
- **Idempotency keys** on hold, pay, and create-order; **outbox pattern** for reliable Kafka publish.
- Real Amazon adds marketplace (seller), fulfillment networks, and cell-based isolation—not all required for a learning clone.
