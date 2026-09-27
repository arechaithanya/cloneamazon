'use client';
import Link from "next/link";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { TopPicks, RelatedItems, AlsoBought, BrowsingHistory } from "../Data/RecommendationsDetail";

// ── Star rating renderer ──────────────────────────────────────────
function StarRating({ rating }) {
  const num = parseFloat(rating);
  return (
    <span className="flex items-center text-[#ff9900] text-xs">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.floor(num) ? (
          <StarIcon key={i} fontSize="inherit" />
        ) : i - num < 0.7 && i > Math.floor(num) ? (
          <StarHalfIcon key={i} fontSize="inherit" />
        ) : (
          <StarBorderIcon key={i} fontSize="inherit" />
        )
      )}
    </span>
  );
}

// ── Single product card (grid) ────────────────────────────────────
function GridProductCard({ product }) {
  return (
    <Link href={`/ProductPaga/${product.id}`} className="block no-underline text-[#0f1111]">
      <div className="bg-white p-2 flex flex-col h-full hover:shadow-md transition-shadow">
        <div className="bg-[#f7f8f8] flex justify-center items-center h-[160px] mb-2">
          <img
            src={product.productImage}
            alt={product.productName}
            className="max-h-[150px] max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150x150?text=Product";
            }}
          />
        </div>
        <p className="text-sm text-[#0f1111] line-clamp-2 overflow-hidden flex-1 min-h-[40px] mb-1">
          {product.productName}
        </p>
        <StarRating rating={product.rating} />
        <p className="text-xs text-[#565959]">{product.reviews}</p>
        <p className="mt-1 font-bold text-sm text-[#0f1111]">₹{product.price}</p>
        <p className="text-xs text-[#565959] line-through">M.R.P.: ₹{product.mrp}</p>
        <p className="text-xs text-[#cc0c39]">({product.discount} off)</p>
        {product.prime && (
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/2020/IN/logo/prime_logo_RGB_white._SL100_.jpg"
            alt="Prime"
            className="h-4 mt-1 object-contain w-fit"
          />
        )}
      </div>
    </Link>
  );
}

// ── Slider product card ───────────────────────────────────────────
function SliderProductCard({ product }) {
  return (
    <Link href={`/ProductPaga/${product.id}`} className="block no-underline text-[#0f1111] px-1">
      <div className="bg-white p-2 hover:shadow-md transition-shadow">
        <div className="bg-[#f7f8f8] flex justify-center items-center h-[180px] mb-2">
          <img
            src={product.productImage}
            alt={product.productName}
            className="max-h-[170px] max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150x180?text=Product";
            }}
          />
        </div>
        <p className="text-sm text-[#0f1111] line-clamp-2 overflow-hidden mb-1">{product.productName}</p>
        <StarRating rating={product.rating} />
        <p className="font-bold text-sm text-[#B12704] mt-1">₹{product.price}</p>
        <p className="text-xs text-[#565959] line-through">₹{product.mrp}</p>
      </div>
    </Link>
  );
}

// ── Reusable horizontal slider block ─────────────────────────────
function ProductRowSlider({ title, products, page }) {
  const sliderSettings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900,  settings: { slidesToShow: 3 } },
      { breakpoint: 600,  settings: { slidesToShow: 2 } },
      { breakpoint: 400,  settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div className="bg-white m-4 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-[#0f1111]">{title}</h2>
        {page && (
          <span className="text-xs text-[#565959]">Page 1 of {page}</span>
        )}
      </div>
      <div className="px-6">
        <Slider {...sliderSettings}>
          {products.map((p) => (
            <div key={p.id}>
              <SliderProductCard product={p} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────
export default function RecommendationsSection() {
  return (
    <>
      {/* ── Top Picks for You ── */}
      <div className="bg-white m-4 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-[#0f1111]">Top picks for you</h2>
          <span className="text-sm text-[#007185] cursor-pointer hover:text-[#c45500] hover:underline">
            See more
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {TopPicks.map((p) => (
            <GridProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* ── Related to items you've viewed ── */}
      <ProductRowSlider
        title="Related to items you've viewed"
        products={RelatedItems}
        page={2}
      />

      {/* ── Customers also bought ── */}
      <ProductRowSlider
        title="Customers who viewed items in your browsing history also bought"
        products={AlsoBought}
        page={3}
      />

      {/* ── Browsing History ── */}
      <div className="bg-white m-4 p-4">
        <h2 className="text-lg font-semibold text-[#0f1111] mb-3">Your browsing history</h2>
        <div className="flex flex-wrap gap-3">
          {BrowsingHistory.map((p) => (
            <Link
              key={p.id}
              href={`/ProductPaga/${p.id}`}
              className="block no-underline text-[#0f1111] w-[120px]"
            >
              <div className="bg-[#f7f8f8] flex justify-center items-center h-[120px] p-2">
                <img
                  src={p.productImage}
                  alt={p.productName}
                  className="max-h-[110px] max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/110?text=Item";
                  }}
                />
              </div>
              <p className="text-xs mt-1 line-clamp-2 text-[#007185]">{p.productName}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
