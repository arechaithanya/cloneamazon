import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function statusLabel(status: string) {
  switch (status) {
    case "PAID":
      return "Arriving soon";
    case "PAYMENT_FAILED":
      return "Payment failed";
    case "CANCELLED":
      return "Cancelled";
    case "DELIVERED":
      return "Delivered";
    default:
      return status;
  }
}

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/orders");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { placedAt: "desc" },
    include: {
      lines: {
        include: {
          variant: { include: { product: { include: { images: { take: 1 } } } } },
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-4 text-gray-600">You haven&apos;t placed any orders yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-md border bg-white p-4">
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <div>
                  <p className="text-gray-600">ORDER PLACED</p>
                  <p>{order.placedAt.toLocaleDateString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-gray-600">TOTAL</p>
                  <p>{formatINR(order.totalCents)}</p>
                </div>
                <div>
                  <p className="font-semibold">{statusLabel(order.status)}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {order.lines.map((line) => (
                  <div key={line.id} className="relative h-16 w-16 overflow-hidden rounded border bg-gray-50">
                    {line.variant.product.images[0] && (
                      <Image src={line.variant.product.images[0].url} alt="" fill className="object-cover" sizes="64px" />
                    )}
                  </div>
                ))}
              </div>
              <Link href={`/orders/${order.id}`} className="mt-3 inline-block text-sm text-[#007185] underline">
                View order details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
