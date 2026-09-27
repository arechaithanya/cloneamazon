import Link from "next/link";
import { getAllCloneProducts } from "@/lib/clone-product-index";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const products = getAllCloneProducts().filter(
    (p) => !query || p.name.toLowerCase().includes(query),
  );

  return (
    <div className="max-w-[1500px] mx-auto my-8 bg-white p-4 text-black">
      <h1 className="text-2xl font-normal mb-4">
        {query ? `Results for “${q}”` : "Search"}
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <Link key={String(p.id)} href={`/ProductPaga/${p.id}`} className="border p-2 hover:outline hover:outline-[#f08804]">
            {p.image && <img src={p.image} alt="" className="mx-auto h-32 object-contain" />}
            <p className="mt-2 text-sm text-[#007185] line-clamp-2">{p.name}</p>
            <p className="font-semibold">₹ {p.price}</p>
          </Link>
        ))}
      </div>
      {products.length === 0 && <p className="text-gray-600">No matches. Try another keyword.</p>}
    </div>
  );
}
