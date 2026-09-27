import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getCart } from "@/lib/cart-service";
import { formatINR } from "@/lib/format";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function CheckoutPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/checkout");

  const cart = await getCart();
  const lines = cart?.lines ?? [];
  if (lines.length === 0) redirect("/cart");

  const { error } = await searchParams;
  const address = user.addresses[0];
  const subtotal = lines.reduce((s, l) => s + l.variant.priceCents * l.quantity, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <section className="rounded-md border bg-white p-4">
          <h2 className="font-semibold">1. Delivery address</h2>
          {address ? (
            <p className="mt-2 text-sm">
              {address.fullName}, {address.line1}, {address.city} {address.postalCode}
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-700">
              <Link href="/account/addresses" className="underline">Add an address</Link>
            </p>
          )}
        </section>
        <section className="rounded-md border bg-white p-4">
          <h2 className="font-semibold">2. Delivery speed</h2>
          <p className="mt-2 text-sm">FREE Prime Delivery — Arriving in 3–5 business days</p>
        </section>
        <section className="rounded-md border bg-white p-4">
          <h2 className="font-semibold">3. Payment</h2>
          <p className="mt-2 text-sm">Simulated payment (no card charged)</p>
        </section>
        <section className="rounded-md border bg-white p-4">
          <h2 className="font-semibold">4. Review & place order</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={l.id}>
                {l.variant.product.title} × {l.quantity} — {formatINR(l.variant.priceCents * l.quantity)}
              </li>
            ))}
          </ul>
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
          <form action="/api/checkout" method="post" className="mt-4 space-y-3">
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input type="checkbox" name="simulatePaymentFail" />
              Simulate payment failure (recon edge case)
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-[#ffd814] py-2 font-medium hover:bg-[#f7ca00]"
            >
              Place your order
            </button>
          </form>
        </section>
      </div>
      <aside className="rounded-md border bg-white p-4">
        <p className="font-semibold">Order total</p>
        <p className="text-2xl">{formatINR(subtotal)}</p>
      </aside>
    </div>
  );
}
