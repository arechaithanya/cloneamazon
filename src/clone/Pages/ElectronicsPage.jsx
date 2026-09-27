'use client';
import { WatchDetail, headphonesDetail } from "../Data/ProductDetail";
import { TodaysDeals } from "../Data/SliderDetail";
import { TopPicks, BrowsingHistory } from "../Data/RecommendationsDetail";
import { ProductGrid } from "./CategoryPage";

const watches = WatchDetail.map((p) => ({
  id: p.id, name: p.name, image: p.image,
  price: p.price, rating: p.rating, reviews: p.review, store: p.store,
}));

const headphones = headphonesDetail.map((p) => ({
  id: p.id, name: p.name, image: p.image,
  price: p.price, rating: p.rating, reviews: p.review, store: p.store,
}));

const deals = TodaysDeals.map((p) => ({
  id: p.id, name: p.productName, image: p.productImage || p.image,
  price: "9999", rating: "4.2", reviews: "",
}));

const elecRecs = [...TopPicks, ...BrowsingHistory]
  .filter((p) => p.category === "Electronics")
  .map((p) => ({
    id: p.id, name: p.productName, image: p.productImage,
    price: p.price, rating: p.rating, reviews: p.reviews,
    discount: p.discount, store: "",
  }));

const sections = [
  { label: "Smart Watches", items: watches },
  { label: "Headphones & Earphones", items: headphones },
  { label: "Today's Deals", items: deals },
  { label: "More Electronics", items: elecRecs },
];

export default function ElectronicsPage() {
  const all = sections.flatMap((s) => s.items);
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6 bg-[#e3e6e6] min-h-screen">
      <p className="text-xs text-[#565959] mb-4">
        <a href="/" className="text-[#007185] hover:underline">Home</a> › Electronics
      </p>
      <h1 className="text-2xl font-semibold text-[#0f1111] mb-6">Electronics</h1>

      {sections.map((sec) =>
        sec.items.length === 0 ? null : (
          <section key={sec.label} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-[#0f1111]">{sec.label}</h2>
              <span className="text-xs bg-[#f3a847] text-black px-2 py-0.5 rounded font-semibold">
                {sec.items.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {sec.items.map((p) => (
                <a
                  key={p.id}
                  href={`/ProductPaga/${p.id}`}
                  className="block bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow no-underline text-[#0f1111] p-3"
                >
                  <div className="bg-[#f7f8f8] flex justify-center items-center h-[160px] mb-2 rounded">
                    <img src={p.image} alt={p.name} className="max-h-[150px] max-w-full object-contain"
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150?text=Product"; }} />
                  </div>
                  <p className="text-sm font-medium line-clamp-2 overflow-hidden mb-1 min-h-[40px]">{p.name}</p>
                  {p.store && <p className="text-xs text-[#565959]">{p.store}</p>}
                  <p className="mt-1 text-base font-bold">₹{p.price}</p>
                  {p.discount && <p className="text-xs text-[#cc0c39]">({p.discount} off)</p>}
                </a>
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
