import { ProductCard } from "@/components/ProductCard";
import { getDealProducts, getFeaturedProducts } from "@/lib/catalog";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, deals] = await Promise.all([getFeaturedProducts(), getDealProducts()]);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg bg-gradient-to-r from-[#232f3e] to-[#37475a] p-6 text-white">
        <p className="text-sm uppercase tracking-wide text-[#febd69]">Great Indian Festival</p>
        <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Shop early deals on sneakers & fashion</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-200">
          Rebuild MVP — search, product pages, cart, and checkout coming next. Seeded catalog from Phase 1 recon.
        </p>
        <Link
          href="/search?q=jordan"
          className="mt-4 inline-block rounded-md bg-[#febd69] px-4 py-2 text-sm font-semibold text-black hover:bg-[#f3a847]"
        >
          Search jordan shoes
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Today&apos;s Deals</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Featured for you</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
