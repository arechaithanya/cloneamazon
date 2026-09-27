import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const sessionId = (await cookies()).get("guest_session")?.value;
  const cart = sessionId
    ? await prisma.cart.findUnique({
        where: { sessionId },
        include: {
          lines: {
            include: {
              variant: { include: { product: { include: { images: { take: 1 } } } } },
            },
          },
        },
      })
    : null;

  const lines = cart?.lines ?? [];
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
              <li key={line.id} className="flex gap-4 py-4">
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
                <div className="flex-1">
                  <Link href={`/product/${line.variant.product.slug}`} className="text-[#007185] hover:underline">
                    {line.variant.product.title}
                  </Link>
                  <p className="text-sm text-gray-600">{line.variant.optionLabel}</p>
                  <p className="mt-1 font-medium">{formatINR(line.variant.priceCents)}</p>
                  <p className="text-sm">Qty: {line.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <aside className="rounded-md border bg-white p-4 lg:sticky lg:top-4 lg:self-start">
        <p className="text-lg">
          Subtotal ({lines.length} items): <span className="font-semibold">{formatINR(subtotal)}</span>
        </p>
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
