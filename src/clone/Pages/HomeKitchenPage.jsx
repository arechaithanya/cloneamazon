'use client';
import { HomeKitchenProducts } from "../Data/HomeKitchenDetail";

const FURNITURE = HomeKitchenProducts.filter((p) => p.id < 6100);
const KITCHEN   = HomeKitchenProducts.filter((p) => p.id >= 6100 && p.id < 6200);
const DECOR     = HomeKitchenProducts.filter((p) => p.id >= 6200);

function ProductCard({ p }) {
  return (
    <a href={`/ProductPaga/${p.id}`}
      className="block bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow no-underline text-[#0f1111] p-3">
      <div className="bg-[#f7f8f8] flex justify-center items-center h-[160px] mb-2 rounded">
        <img src={p.productImage} alt={p.productName} className="max-h-[150px] max-w-full object-contain"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150?text=Product"; }} />
      </div>
      <p className="text-sm font-medium line-clamp-2 overflow-hidden mb-1 min-h-[40px]">{p.productName}</p>
      <div className="flex items-center gap-1 text-[#ff9900] text-xs mb-1">
        {"★".repeat(Math.round(parseFloat(p.rating)))}{"☆".repeat(5 - Math.round(parseFloat(p.rating)))}
        <span className="text-[#565959] ml-1">{p.reviews}</span>
      </div>
      <p className="text-base font-bold">₹{p.price}</p>
      <p className="text-xs text-[#565959] line-through">₹{p.mrp}</p>
      <p className="text-xs text-[#cc0c39]">{p.discount} off</p>
      <p className="text-xs text-[#007185] mt-1">FREE delivery</p>
    </a>
  );
}

function Section({ title, badge, products }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-[#0f1111]">{title}</h2>
        <span className="text-xs bg-[#f3a847] text-black px-2 py-0.5 rounded font-semibold">{badge}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

export default function HomeKitchenPage() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6 bg-[#e3e6e6] min-h-screen">
      <p className="text-xs text-[#565959] mb-4">
        <a href="/" className="text-[#007185] hover:underline">Home</a> › Home & Kitchen
      </p>
      <h1 className="text-2xl font-semibold text-[#0f1111] mb-6">Home & Kitchen</h1>
      <Section title="Furniture" badge={`${FURNITURE.length} items`} products={FURNITURE} />
      <Section title="Kitchen & Dining" badge={`${KITCHEN.length} items`} products={KITCHEN} />
      <Section title="Home Décor & Bedding" badge={`${DECOR.length} items`} products={DECOR} />
    </div>
  );
}
