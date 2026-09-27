import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/cart-service";
import { formatINR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  const lines = cart?.lines ?? [];
  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.variant.priceCents * l.quantity, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="rounded-md border bg-white p-4">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        {lines.length === 0 ? (
          <p className="mt-6 text-gray-600">
            Your cart is empty. <Link href="/search?q=shoes" className="text-[#007185] underline">Continue shopping</Link>
          </p>
        ) : (
          <ul className="mt-4 divide-y">
            {lines.map((line) => (
              <li key={line.id} className="flex flex-wrap gap-4 py-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-gray-50">
                  {line.variant.product.images[0] && (
                    <Image
                      src={line.variant.product.images[0].url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </div>
                <div className="min-w-[200px] flex-1">
                  <Link href={`/product/${line.variant.product.slug}`} className="text-[#007185] hover:underline">
                    {line.variant.product.title}
                  </Link>
                  <p className="text-sm text-gray-600">{line.variant.optionLabel}</p>
                  <p className="mt-1 font-medium">{formatINR(line.variant.priceCents)}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <form action="/api/cart" method="post" className="flex items-center gap-2">
                    <input type="hidden" name="action" value="update" />
                    <input type="hidden" name="lineId" value={line.id} />
                    <label className="text-xs text-gray-600">Qty</label>
                    <select name="quantity" defaultValue={line.quantity} className="rounded border px-2 py-1 text-sm">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs text-[#007185] underline">Update</button>
                  </form>
                  <form action="/api/cart" method="post">
                    <input type="hidden" name="action" value="remove" />
                    <input type="hidden" name="lineId" value={line.id} />
                    <button type="submit" className="text-xs text-[#007185] underline">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <aside className="rounded-md border bg-white p-4 lg:sticky lg:top-4 lg:self-start">
        <p className="text-lg">
          Subtotal ({itemCount} items): <span className="font-semibold">{formatINR(subtotal)}</span>
        </p>
        <p className="text-xs text-gray-600">FREE delivery on this order</p>
        <Link
          href="/checkout"
          className="mt-4 block w-full rounded-full bg-[#ffd814] py-2 text-center text-sm font-medium hover:bg-[#f7ca00]"
        >
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}
