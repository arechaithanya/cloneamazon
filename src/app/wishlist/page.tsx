import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/wishlist");

  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      variant: {
        include: { product: { include: { images: { take: 1 } } } },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Shopping List</h1>
      <p className="text-sm text-gray-600">Private list</p>
      {items.length === 0 ? (
        <p className="mt-6 text-gray-600">Your list is empty.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex flex-wrap gap-4 rounded-md border bg-white p-4">
              <div className="relative h-24 w-24 overflow-hidden rounded bg-gray-50">
                {item.variant.product.images[0] && (
                  <Image src={item.variant.product.images[0].url} alt="" fill className="object-cover" sizes="96px" />
                )}
              </div>
              <div className="flex-1">
                <Link href={`/product/${item.variant.product.slug}`} className="text-[#007185] hover:underline">
                  {item.variant.product.title}
                </Link>
                <p className="text-sm text-gray-600">{item.variant.optionLabel}</p>
                <p className="font-medium">{formatINR(item.variant.priceCents)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <form action="/api/wishlist" method="post">
                  <input type="hidden" name="action" value="moveToCart" />
                  <input type="hidden" name="itemId" value={item.id} />
                  <button type="submit" className="rounded-full bg-[#ffd814] px-4 py-1 text-sm font-medium">
                    Add to Cart
                  </button>
                </form>
                <form action="/api/wishlist" method="post">
                  <input type="hidden" name="action" value="remove" />
                  <input type="hidden" name="itemId" value={item.id} />
                  <button type="submit" className="text-xs text-[#007185] underline">Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
