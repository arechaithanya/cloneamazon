import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { formatINR } from "@/lib/format";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ v?: string }>;
};

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { v: variantId } = await searchParams;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const selectedVariant =
    product.variants.find((x) => x.id === variantId) ?? product.variants[0];
  const related = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-md border bg-white p-4">
        <div className="grid gap-4 md:grid-cols-[120px_1fr]">
          <div className="flex flex-col gap-2">
            {product.images.map((img) => (
              <div key={img.id} className="relative aspect-square w-full overflow-hidden rounded border">
                <Image src={img.url} alt="" fill className="object-cover" sizes="120px" />
              </div>
            ))}
          </div>
          <div className="relative aspect-square max-h-[480px] w-full overflow-hidden rounded bg-gray-50">
            <Image
              src={product.images[0]?.url ?? ""}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-medium">{product.title}</h1>
        <p className="text-sm text-[#007185]">{product.brand}</p>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-[#007185]">★ {product.ratingAvg.toFixed(1)}</span>
          <Link href="#reviews" className="text-[#007185] hover:underline">
            {product.reviewCount} ratings
          </Link>
        </div>
        <hr className="my-4" />
        <h2 id="reviews" className="font-semibold">Customer reviews</h2>
        <ul className="mt-2 space-y-3">
          {product.reviews.map((r) => (
            <li key={r.id} className="rounded border p-3 text-sm">
              <p className="font-medium">★ {r.rating} — {r.title}</p>
              <p className="text-gray-700">{r.body}</p>
              {r.verifiedPurchase && <p className="text-xs text-[#c45500]">Verified Purchase</p>}
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-md border bg-white p-4 lg:sticky lg:top-4 lg:self-start">
        {product.isDeal && (
          <p className="text-xs font-semibold text-[#cc0c39]">Limited-time deal</p>
        )}
        <p className="text-3xl font-medium">{formatINR(selectedVariant?.priceCents ?? 0)}</p>
        {selectedVariant?.listPriceCents && (
          <p className="text-sm text-gray-500">
            M.R.P.: <span className="line-through">{formatINR(selectedVariant.listPriceCents)}</span>
          </p>
        )}
        {selectedVariant && selectedVariant.stock <= 5 && (
          <p className="mt-1 text-sm font-semibold text-[#b12704]">Only {selectedVariant.stock} left in stock</p>
        )}
        <p className="mt-2 text-sm text-gray-700">Colour / size options</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <Link
              key={v.id}
              href={`/product/${product.slug}?v=${v.id}`}
              className={`rounded border px-2 py-1 text-xs ${v.id === selectedVariant?.id ? "border-[#c7511f] bg-orange-50" : ""}`}
            >
              {v.optionLabel}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <span className="font-semibold text-[#007185]">FREE delivery</span> to Hyderabad 500081
        </p>
        <form action="/api/cart" method="post" className="mt-4 space-y-2">
          <input type="hidden" name="variantId" value={selectedVariant?.id ?? ""} />
          <button
            type="submit"
            className="w-full rounded-full bg-[#ffd814] py-2 text-sm font-medium hover:bg-[#f7ca00]"
          >
            Add to Cart
          </button>
        </form>
        <form action="/api/cart" method="post" className="mt-2">
          <input type="hidden" name="action" value="add" />
          <input type="hidden" name="variantId" value={selectedVariant?.id ?? ""} />
          <input type="hidden" name="redirect" value="checkout" />
          <button
            type="submit"
            className="w-full rounded-full bg-[#ffa41c] py-2 text-sm font-medium hover:bg-[#fa8900]"
          >
            Buy Now
          </button>
        </form>
        <form action="/api/wishlist" method="post" className="mt-2">
          <input type="hidden" name="action" value="add" />
          <input type="hidden" name="variantId" value={selectedVariant?.id ?? ""} />
          <input type="hidden" name="redirect" value={`/product/${product.slug}`} />
          <button type="submit" className="w-full text-center text-xs text-[#007185] underline">
            Add to Wish List
          </button>
        </form>
      </aside>

      {related.length > 0 && (
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">Customers who viewed this also viewed</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
