'use client';
import Link from "next/link";

function StarRow({ rating }) {
  const raw = parseFloat(rating);
  // ratings stored as "34565" (review count) or "4.1" (stars) — normalise
  const stars = raw > 5 ? 4 : raw || 4;
  const clamped = Math.min(5, Math.max(1, Math.round(stars)));
  return (
    <span className="flex text-[#ff9900] text-xs">
      {"★".repeat(clamped)}{"☆".repeat(5 - clamped)}
    </span>
  );
}

export function ProductGrid({ title, subtitle, products }) {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6 bg-[#e3e6e6] min-h-screen">
      <p className="text-xs text-[#565959] mb-4">
        <Link href="/" className="text-[#007185] hover:underline">Home</Link>
        {" › "}
        <span>{title}</span>
      </p>
      <h1 className="text-2xl font-semibold text-[#0f1111] mb-1">{title}</h1>
      <p className="text-sm text-[#565959] mb-6">{subtitle || `${products.length} results`}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/ProductPaga/${p.id}`}
            className="block bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow no-underline text-[#0f1111] p-3"
          >
            <div className="bg-[#f7f8f8] flex justify-center items-center h-[160px] mb-2 rounded">
              <img
                src={p.image}
                alt={p.name}
                className="max-h-[150px] max-w-full object-contain"
                onError={(e) => { e.currentTarget.src = `https://placehold.co/150x150?text=${encodeURIComponent(p.name.slice(0,6))}`; }}
              />
            </div>
            <p className="text-sm font-medium line-clamp-2 overflow-hidden mb-1 min-h-[40px]">{p.name}</p>
            {p.store && <p className="text-xs text-[#565959] mb-1">{p.store}</p>}
            <StarRow rating={p.rating} />
            {p.reviews && <p className="text-xs text-[#565959]">{p.reviews}</p>}
            <p className="mt-2 text-base font-bold">₹{p.price}</p>
            {p.discount && <p className="text-xs text-[#cc0c39]">({p.discount} off)</p>}
            <p className="text-xs text-[#007185] mt-0.5">FREE delivery</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
