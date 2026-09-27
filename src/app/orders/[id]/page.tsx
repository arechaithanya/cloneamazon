import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { trackingSteps } from "@/lib/orders";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ placed?: string }> };

export default async function OrderDetailPage({ params, searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/orders");

  const { id } = await params;
  const { placed } = await searchParams;

  const order = await prisma.order.findFirst({
    where: { id, userId: user.id },
    include: {
      lines: {
        include: {
          variant: { include: { product: { include: { images: { take: 1 } } } } },
        },
      },
    },
  });
  if (!order) notFound();

  const { steps, activeIndex } = trackingSteps(order.status);
  const addr = order.shippingAddressSnapshot as Record<string, string>;

  return (
    <div className="space-y-6">
      {placed && (
        <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-900">
          Order placed! Thank you for shopping.
        </div>
      )}
      <h1 className="text-2xl font-semibold">Order details</h1>
      <p className="text-sm text-gray-600">Order #{order.id.slice(0, 8)}</p>

      {order.status === "PAYMENT_FAILED" && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          Payment failed. You were not charged. Try placing the order again.
        </p>
      )}

      {activeIndex >= 0 && order.status !== "PAYMENT_FAILED" && (
        <section className="rounded-md border bg-white p-4">
          <h2 className="font-semibold">Arriving soon</h2>
          <ol className="mt-4 flex flex-wrap gap-4 text-sm">
            {steps.map((step, i) => (
              <li key={step} className={i <= activeIndex ? "font-semibold text-[#007185]" : "text-gray-400"}>
                {step}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-md border bg-white p-4">
        <h2 className="font-semibold">Items</h2>
        <ul className="mt-3 divide-y">
          {order.lines.map((line) => (
            <li key={line.id} className="flex gap-3 py-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-gray-50">
                {line.variant.product.images[0] && (
                  <Image src={line.variant.product.images[0].url} alt="" fill className="object-cover" sizes="80px" />
                )}
              </div>
              <div>
                <p>{line.titleSnapshot}</p>
                <p className="text-sm text-gray-600">Qty: {line.quantity}</p>
                <p className="text-sm font-medium">{formatINR(line.unitPriceCents * line.quantity)}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">Total: {formatINR(order.totalCents)}</p>
      </section>

      <section className="rounded-md border bg-white p-4 text-sm">
        <h2 className="font-semibold">Ship to</h2>
        <p className="mt-2">
          {addr.fullName}<br />
          {addr.line1}<br />
          {addr.city}, {addr.state} {addr.postalCode}
        </p>
      </section>

      <Link href="/orders" className="text-[#007185] underline">← Back to orders</Link>
    </div>
  );
}
