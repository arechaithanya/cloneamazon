# amazon.rebuild

Amazon.in-style storefront MVP for the 8x assignment. Phase 1 recon lives in [`docs/`](./docs/). Agent capture: [`.agent-logs/`](./.agent-logs/) and [`CAPTURE-TEST.md`](./CAPTURE-TEST.md).

## Stack

- **Next.js 15** (App Router) + Tailwind CSS 4
- **PostgreSQL** + **Prisma**
- Deploy target: **Vercel** + [Neon](https://neon.tech) (or Supabase) Postgres

## Local setup

```bash
cp env.example .env
# Set DATABASE_URL to your Postgres connection string
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo user (after seed):** `demo@amazon-rebuild.test` / `demo1234` (auth UI Phase 3).

## Deploy (Vercel)

1. Push repo to GitHub.
2. Import project in Vercel.
3. Add env vars: `DATABASE_URL`, `SESSION_SECRET`.
4. Build command: `npm run build` (runs `prisma generate`).
5. After first deploy, run `npx prisma db push` and `npx prisma db seed` against production DB (or use Vercel build hook / manual).

## Scripts

| Command | Purpose |
| -------- | -------- |
| `npm run dev` | Dev server |
| `npm run db:push` | Apply Prisma schema |
| `npm run db:seed` | Seed categories + sneakers |
| `npm run build` | Production build |
