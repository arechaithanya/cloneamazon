import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/catalog";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; sort?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", sort = "featured" } = await searchParams;
  const sortKey = sort === "price-asc" || sort === "price-desc" ? sort : "featured";
  const products = await searchProducts(q, sortKey);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <aside className="w-full shrink-0 rounded-md border bg-white p-4 md:w-56">
        <h2 className="font-semibold">Filters</h2>
        <p className="mt-2 text-sm text-gray-600">Brand, Prime, and price facets — Phase 3.</p>
      </aside>
      <div className="flex-1">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-gray-700">
            {products.length} results for <span className="font-semibold">&quot;{q || "all"}&quot;</span>
          </p>
          <div className="flex gap-2 text-sm">
            {(["featured", "price-asc", "price-desc"] as const).map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(q)}&sort=${s}`}
                className={`rounded border px-2 py-1 ${sortKey === s ? "border-[#c7511f] bg-orange-50" : "border-gray-300 bg-white"}`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="rounded-md border bg-white p-8 text-center text-gray-600">No products match your search.</p>
        )}
      </div>
    </div>
  );
}
