'use client';
import { RelatedItems, AlsoBought } from "../Data/RecommendationsDetail";
import { ProductGrid } from "./CategoryPage";

const womens = RelatedItems.map((p) => ({
  id: p.id, name: p.productName, image: p.productImage,
  price: p.price, rating: p.rating, reviews: p.reviews,
  discount: p.discount, store: p.category,
}));

const kids = AlsoBought.map((p) => ({
  id: p.id, name: p.productName, image: p.productImage,
  price: p.price, rating: p.rating, reviews: p.reviews,
  discount: p.discount, store: p.category,
}));

const all = [...womens, ...kids];

export default function FashionPage() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6 bg-[#e3e6e6] min-h-screen">
      <p className="text-xs text-[#565959] mb-4">
        <a href="/" className="text-[#007185] hover:underline">Home</a> › Fashion
      </p>
      <h1 className="text-2xl font-semibold text-[#0f1111] mb-6">Fashion</h1>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#0f1111] mb-4">Women's Fashion</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {womens.map((p) => (
            <a key={p.id} href={`/ProductPaga/${p.id}`}
              className="block bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow no-underline text-[#0f1111] p-3">
              <div className="bg-[#f7f8f8] flex justify-center items-center h-[200px] mb-2 rounded">
                <img src={p.image} alt={p.name} className="max-h-[190px] max-w-full object-cover rounded"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/150x200?text=Fashion"; }} />
              </div>
              <p className="text-sm font-medium line-clamp-2 overflow-hidden mb-1">{p.name}</p>
              <p className="text-base font-bold">₹{p.price}</p>
              <p className="text-xs text-[#565959] line-through">₹{p.mrp}</p>
              <p className="text-xs text-[#cc0c39]">{p.discount} off</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#0f1111] mb-4">Kids' Fashion</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {kids.map((p) => (
            <a key={p.id} href={`/ProductPaga/${p.id}`}
              className="block bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow no-underline text-[#0f1111] p-3">
              <div className="bg-[#f7f8f8] flex justify-center items-center h-[200px] mb-2 rounded">
                <img src={p.image} alt={p.name} className="max-h-[190px] max-w-full object-cover rounded"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/150x200?text=Kids"; }} />
              </div>
              <p className="text-sm font-medium line-clamp-2 overflow-hidden mb-1">{p.name}</p>
              <p className="text-base font-bold">₹{p.price}</p>
              <p className="text-xs text-[#565959] line-through">₹{p.mrp}</p>
              <p className="text-xs text-[#cc0c39]">{p.discount} off</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
