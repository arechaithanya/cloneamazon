import Image from "next/image";
import Link from "next/link";
import type { ProductCardData } from "@/lib/catalog";
import { formatINR } from "@/lib/format";

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex h-full flex-col rounded-md border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded bg-gray-50">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.title} fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">No image</div>
        )}
        {product.isDeal && (
          <span className="absolute left-2 top-2 rounded bg-[#cc0c39] px-2 py-0.5 text-xs font-semibold text-white">
            Deal
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 text-sm text-[#007185] hover:text-[#c7511f] hover:underline">
        {product.title}
      </h3>
      {product.brand && <p className="text-xs text-gray-500">{product.brand}</p>}
      <div className="mt-1 flex items-center gap-1 text-xs text-[#007185]">
        <span>★ {product.ratingAvg.toFixed(1)}</span>
        <span className="text-gray-500">({product.reviewCount})</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-medium text-gray-900">{formatINR(product.priceCents)}</span>
        {product.listPriceCents && (
          <span className="ml-2 text-sm text-gray-500 line-through">{formatINR(product.listPriceCents)}</span>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-600">FREE delivery · Prime eligible</p>
    </Link>
  );
}
