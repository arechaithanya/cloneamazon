'use client';
import React, { useState, useEffect } from "react";
import StarIcon from '@mui/icons-material/Star';
import {
  ProductDetail,
  WatchDetail,
  LaptopDetail,
  headphonesDetail,
} from "../Data/ProductDetail";
import { TodaysDeals } from "../Data/SliderDetail";
import { TopPicks, RelatedItems, AlsoBought, BrowsingHistory } from "../Data/RecommendationsDetail";
import { HomeKitchenProducts } from "../Data/HomeKitchenDetail";
import { shippingDetail } from "../Data/data";
import Link from "next/link"
import { useParams } from "next/navigation";
const ProductPaga = () => {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState({});
  const [selectedColorImage, setSelectedColorImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const items = [...ProductDetail, ...WatchDetail, ...LaptopDetail, ...headphonesDetail, ...TodaysDeals, ...TopPicks, ...RelatedItems, ...AlsoBought, ...BrowsingHistory, ...HomeKitchenProducts];
    const found = items.find(item => item.id == id);
    if (found) setProduct({
      ...found,
      // normalise field names across different data sources
      image: found.image || found.productImage,
      name: found.name || found.productName,
      price: found.price || "—",
      rating: found.rating || "4.0",
    });
  }, [id]);

  return (
    <div className=" bg-white">
      <main className="max-w-[1500px] mx-auto">
        <div className=" text-black text-xs font-semibold py-2">
          <p>{product.pagination}</p>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start text-black text-sm leading-5 py-2 px-2">

          {/* Small product thumbnails */}
          <div className=" w-[90px] p-4 cursor-pointer">
            {/* <SmallProduct colors={product.colors} /> */}
            <SmallProduct
              smallImg={product.smallImg}
              onImageClick={(img) => setSelectedColorImage(img)}
            />
          </div>

          {/* Main Product Image */}

          <div className="w-full lg:w-[30%]">
            <img className=" w-full"
              src={selectedColorImage ? selectedColorImage : product.image}
              alt=""
            />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-[40%] p-4">
            <div className="border-b border-gray-300 pb-2">
              <p className="font-semibold capitalize text-lg leading-6">{product.name}</p>
              <a
                href="https://www.apple.com/in/"
                className="!text-[#007185] text-sm leading-5">
                {product.store}
              </a>
              <div className=" flex items-center gap-2 cursor-pointer justify-start">
                <span className=" flex">
                  <StarIcon className="text-yellow-500" />
                  <StarIcon className="text-yellow-500" />
                  <StarIcon className="text-yellow-500" />
                  <StarIcon />
                  <StarIcon />
                </span>
                <div className="text-[#007185] text-sm leading-5 cursor-pointer p-2">
                  {product.rating} ratings
                </div>
                <div className="w-[2px] h-4 bg-black"></div>
                <div className="text-[#007185] text-sm px-2 cursor-pointer">
                  587 answered questions
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300 pb-2">
              <p className="text-red-600 font-semibold text-sm leading-5">Ends in 03h 28m 15s</p>
              <p className=" text-[28px] font-semibold py-2">
                <sup className="text-sm p-1">₹</sup>
                {product.price}
                {/* <sup className="text-xs p-1">00</sup> */}
              </p>
              <div className="py-2">Inclusive of all taxes</div>
              <div>
                <span className="font-semibold capitalize">EMI</span> starts at ₹{product.emi}. No Cost EMI available <span className="text-[#007185] text-sm leading-5 cursor-pointer">EMI options</span>
              </div>
            </div>

            <div className="border-b border-gray-300 pb-2">
              <div className="flex justify-center items-center gap-1">
                <EmiSection />
              </div>
            </div>

            <div className="border-b border-gray-300 pb-2">
              <div className=" flex justify-center items-center gap-1">
                <ShippingIcon Product={shippingDetail} />
              </div>
            </div>

            {/* Dynamic Color Section */}
            <div className=" cursor-pointer">
              <ColorSelector colors={product.colors} setSelectedColorImage={setSelectedColorImage} />
            </div>

            <div className="border-b border-gray-300 pb-2">
              <h3 className="py-2 font-semibold">About this item</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {Array.isArray(product.about)
                  ? product.about.map((point, i) => <li key={i}>{point}</li>)
                  : product.about
                    ? <li>{product.about}</li>
                    : null}
              </ul>
            </div>

            {/* Static reviews section */}
            <div className="border-b border-gray-300 pb-4 pt-2">
              <h3 className="font-semibold mb-2">Customer reviews</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex text-[#ff9900]">
                  {'★'.repeat(Math.round(parseFloat(product.rating || '4')))}{'☆'.repeat(5 - Math.round(parseFloat(product.rating || '4')))}
                </span>
                <span className="text-sm font-semibold">{product.rating || '4.0'} out of 5</span>
              </div>
              {[
                { name: "Rohan M.", stars: 5, title: "Great product, fast delivery!", body: "Really happy with this purchase. Quality is exactly as described and delivery was quick. Would recommend to anyone looking for value for money.", date: "12 September 2026" },
                { name: "Priya S.", stars: 4, title: "Good quality for the price", body: "Product works well and looks good. Packaging was secure. Slight delay in delivery but overall satisfied with the purchase.", date: "3 October 2026" },
                { name: "Arun K.", stars: 5, title: "Excellent! Exceeded expectations", body: "Fantastic product. Build quality is solid and it performs exactly as advertised. Will definitely buy again from this seller.", date: "27 August 2026" },
              ].map((r, i) => (
                <div key={i} className="border-t border-gray-100 pt-3 mt-3">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <div className="flex items-center gap-1 text-[#ff9900] text-xs my-0.5">
                    {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                    <span className="text-[#0f1111] ml-1 font-semibold">{r.title}</span>
                  </div>
                  <p className="text-xs text-[#565959]">Reviewed on {r.date}</p>
                  <p className="text-sm mt-1">{r.body}</p>
                </div>
              ))}
            </div>
          </div>



          {/* Buy Now Section */}
          <div className="border border-gray-300 rounded w-full lg:w-[20%] p-4 shrink-0">
            <p className=" text-[28px] font-semibold">
              <sup className="text-xs p-1">₹</sup>
              {product.price}
              <sup className="text-xs p-1">00</sup>
            </p>
            <p className="font-semibold capitalize py-2">
              <span className="text-[#007185] text-sm leading-5 cursor-pointer">FREE delivery</span>
              {product.delivery}
              <span className="text-[#007185] text-sm leading-5 cursor-pointer">Details</span>
            </p>
            <p className="font-semibold capitalize py-2">
              Or fastest delivery Tomorrow.
              <span className="text-[#007185] text-sm leading-5 cursor-pointer">Details</span>
            </p>
            <span className="text-[#007600] text-[18px] leading-6">
              {product.status}
            </span>
            <div className=" text-center">
              {product.id && (
                <>
                  <form action="/api/clone/cart" method="post">
                    <input type="hidden" name="cloneId" value={product.id} />
                    <input type="hidden" name="redirect" value="/CartPage" />
                    <CartButton name="Add to Cart" type="submit" />
                  </form>
                  <form action="/api/clone/cart" method="post">
                    <input type="hidden" name="cloneId" value={product.id} />
                    <input type="hidden" name="redirect" value="/checkout" />
                    <CartButton name="Buy Now" color="#FFA41C" type="submit" />
                  </form>
                  <Link
                    href="/wishlist"
                    className="block text-sm text-[#007185] mt-2 hover:text-[#c45500] hover:underline"
                  >
                    ♡ Add to Wish List
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPaga;










export const CartButton = ({ name, color, onClick, type = "button" }) => (
  <button
    type={type}
    className="rounded-[20px] px-8 py-2 border-none text-sm leading-5 w-[80%] my-2 mx-4 shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:opacity-50 cursor-pointer"
    style={{ backgroundColor: `${color || "#FFD814"}` }}
    onClick={onClick}
  >
    {name}
  </button>
);



export const EmiSection = () => (
  <div className="rounded-sm px-2 py-1 border flex-1 m-1 shadow-[0_0_4px_0_rgba(0,0,0,0.3)]">
    <p className="font-semibold capitalize">No Cost EMI</p>
    <p>Upto ₹85.51 EMI interest savings on Amazon Pay ICICI…</p>
    <span className="text-[#007185] text-sm leading-5 cursor-pointer">2 offers</span>
  </div>
);




export const ShippingIcon = ({ Product }) => (
  <>
    {Product.map((item) => (
      <div className=" flex justify-center items-center flex-col text-center py-1"
        key={item.id}>
        <img
          src={item.image}
          alt={item.image}
          className="w-12 object-cover" />
        <p className="text-[#007185] text-sm leading-5 cursor-pointer">{item.name}</p>
      </div>
    ))}
  </>
);




export const ColorSelector = ({ colors = [], setSelectedColorImage }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);

  if (!colors.length) return null;

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedColorImage(color.image);
  };

  return (
    <div className="border-b border-gray-300 pb-2">
      <p>Colour: <span className="font-semibold capitalize">{selectedColor?.color || "N/A"}</span></p>
      <ul className=" flex justify-start items-center gap-1 py-2">
        {colors.map((item) => (
          <li className=" text-center" key={item.id}>
            <img
              onClick={() => handleColorClick(item)}
              src={item.image}
              alt={item.color}
              className=" w-[100px] border p-1 rounded-[3px] mx-1 border-[#bbbfbf] hover:border-blue-500 mb-1"
            />
            <p>₹ {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};




export const SmallProduct = ({ smallImg = [], onImageClick }) => {
  if (!smallImg.length) return null;

  return (
    <div className=" flex flex-col gap-1">
      {smallImg.map((item) => (
        <div
          className=" m-2 rounded-[8px] p-2 border border-black hover:border-blue-500"
          key={item.id}
          onClick={() => onImageClick(item.image)}
        >
          <img
            src={item.image}
            alt={`product-${item.id}`}
            className=" w-12 h-10" />
        </div>
      ))}
    </div>
  );
};



// export const SmallProduct = ({ colors = [] }) => {
//   // if (!colors.length) return null;

//   return (
//     <>
//       {.map((item) => (
//         <div className="small-product" key={item.id}>
//           <img src={item.image} alt={item.color} />
//         </div>
//       ))}
//     </>
//   );
// };

