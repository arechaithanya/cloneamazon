'use client';
import Link from "next/link";
import { ProductDetail } from "../Data/ProductDetail";
import { TopPicks } from "../Data/RecommendationsDetail";
import StarIcon from "@mui/icons-material/Star";

// All phones: iPhones from ProductDetail (IDs 101–116) + Nokia from TopPicks
const iphones = ProductDetail.map((p) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  price: p.price,
  rating: p.rating,
  reviews: p.review,
  store: p.store || "Apple",
}));

const otherPhones = TopPicks.filter((p) => p.category === "Mobiles").map((p) => ({
  id: p.id,
  name: p.productName,
  image: p.productImage,
  price: p.price,
  rating: p.rating,
  reviews: p.reviews,
  store: "Nokia",
}));

const allMobiles = [...iphones, ...otherPhones];

function StarRow({ rating }) {
  const num = Math.round(parseFloat(rating) / 1000) || 4;
  const clamped = Math.min(5, Math.max(1, num));
  return (
    <span className="flex text-[#ff9900] text-xs">
      {"★".repeat(clamped)}{"☆".repeat(5 - clamped)}
    </span>
  );
}

function MobileCard({ product }) {
  return (
    <Link
      href={`/ProductPaga/${product.id}`}
      className="block bg-white border border-gray-200 rounded hover:shadow-lg transition-shadow no-underline text-[#0f1111] p-3"
    >
      <div className="bg-[#f7f8f8] flex justify-center items-center h-[180px] mb-3 rounded">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-[170px] max-w-full object-contain"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200?text=Phone"; }}
        />
      </div>
      <p className="text-sm font-medium line-clamp-2 overflow-hidden mb-1">{product.name}</p>
      <p className="text-xs text-[#565959] mb-1">{product.store}</p>
      <StarRow rating={product.rating} />
      <p className="text-xs text-[#565959]">{product.reviews} ratings</p>
      <p className="mt-2 text-base font-bold text-[#0f1111]">₹{product.price}</p>
      <p className="text-xs text-[#cc0c39] mt-0.5">FREE delivery</p>
    </Link>
  );
}

export default function MobilesPage() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <p className="text-xs text-[#565959] mb-4">
        <Link href="/" className="text-[#007185] hover:underline">Home</Link>
        {" › "}
        <span>Mobiles</span>
      </p>

      <h1 className="text-2xl font-semibold text-[#0f1111] mb-1">Mobiles</h1>
      <p className="text-sm text-[#565959] mb-6">{allMobiles.length} results</p>

      {/* Apple iPhones */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-[#0f1111]">Apple iPhones</h2>
          <span className="text-xs bg-[#ff9900] text-black px-2 py-0.5 rounded font-semibold">
            {iphones.length} models
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {iphones.map((p) => (
            <MobileCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Other phones */}
      {otherPhones.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-[#0f1111] mb-4">Other Phones</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {otherPhones.map((p) => (
              <MobileCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
