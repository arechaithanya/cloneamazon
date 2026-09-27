'use client';

import Link from "next/link";
import { CartButton } from "./ProductPaga";

function formatRupee(cents) {
  return `₹ ${(cents / 100).toLocaleString("en-IN")}`;
}

export default function CartPageConnected({ lines }) {
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.variant.priceCents * l.quantity, 0);

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="flex flex-col gap-4 my-12 lg:flex-row">
        <div className="flex-1 bg-white text-[#0F1111] p-4">
          <h2 className="font-normal text-[28px] leading-9 mb-3">
            {lines.length > 0 ? "Shopping Cart" : "Your Amazon Cart is empty."}
          </h2>
          <div className="w-full h-px bg-[#DDD]" />

          {lines.length === 0 && (
            <p className="mt-4 text-sm">
              <Link href="/" className="text-[#007185] hover:underline">Shop today&apos;s deals</Link>
            </p>
          )}

          {lines.map((line) => {
            const img = line.variant.product.images[0]?.url;
            const cloneMatch = line.variant.product.slug.match(/^clone-(.+)$/);
            const productHref = cloneMatch
              ? `/ProductPaga/${cloneMatch[1]}`
              : `/product/${line.variant.product.slug}`;

            return (
              <div key={line.id} className="flex gap-4 p-4 border-b border-[#ddd]">
                <div className="w-40">
                  {img && <img src={img} alt="" className="w-full max-w-[10rem] object-contain" />}
                </div>
                <div className="flex-grow">
                  <Link href={productHref} className="text-[18px] text-[#007185] hover:underline">
                    {line.variant.product.title}
                  </Link>
                  <p className="text-[12px] text-[#007600]">In stock</p>
                  <p className="text-[12px]">Eligible for FREE Shipping</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <form action="/api/cart" method="post" className="flex items-center gap-1">
                      <input type="hidden" name="action" value="update" />
                      <input type="hidden" name="lineId" value={line.id} />
                      <select
                        name="quantity"
                        defaultValue={line.quantity}
                        className="text-[12px] bg-[#F0F2F2ed] rounded-md px-2 py-1 shadow-md"
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </form>
                    <form action="/api/cart" method="post">
                      <input type="hidden" name="action" value="remove" />
                      <input type="hidden" name="lineId" value={line.id} />
                      <button type="submit" className="text-[#007185] text-[12px] cursor-pointer">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
                <div className="text-right text-[1.2rem] font-bold w-max">
                  {formatRupee(line.variant.priceCents * line.quantity)}
                </div>
              </div>
            );
          })}

          {lines.length > 0 && (
            <>
              <div className="w-full h-px bg-[#DDD] mt-4" />
              <p className="text-right text-lg leading-6 p-4">
                Subtotal ({itemCount} items): <b>{formatRupee(subtotal)}</b>
              </p>
            </>
          )}
        </div>

        <div className="w-full lg:w-1/4 bg-white text-[#0F1111] p-4 h-fit">
          <span className="text-[12px] leading-4">
            <span className="text-[#067D62]">Your order is eligible for FREE Delivery.</span> Select this option at checkout.
          </span>
          <p className="text-lg leading-6 py-4">
            Subtotal ({itemCount} items): <b>{formatRupee(subtotal)}</b>
          </p>
          <CartButton
            name="Proceed to checkout"
            color="#FFD814"
            onClick={() => {
              if (lines.length > 0) window.location.href = "/checkout";
            }}
          />
        </div>
      </div>
    </div>
  );
}
