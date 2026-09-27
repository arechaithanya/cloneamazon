import { prisma } from "@/lib/prisma";
import { getCloneProductById } from "@/lib/clone-product-index";

function priceToCents(price: string): number {
  const n = parseInt(String(price).replace(/[^\d]/g, ""), 10);
  if (!n) return 99900;
  return n * 100;
}

export async function ensureVariantForCloneId(cloneId: string | number): Promise<string> {
  const item = getCloneProductById(cloneId);
  if (!item) {
    throw new Error(`Unknown clone product id: ${cloneId}`);
  }

  const slug = `clone-${cloneId}`;
  const existing = await prisma.product.findUnique({
    where: { slug },
    include: { variants: { take: 1 } },
  });
  if (existing?.variants[0]) {
    return existing.variants[0].id;
  }

  let category = await prisma.category.findUnique({ where: { slug: "electronics" } });
  if (!category) {
    category = await prisma.category.create({
      data: { name: "Electronics", slug: "electronics" },
    });
  }

  const product = await prisma.product.create({
    data: {
      title: item.name,
      slug,
      description: item.about?.length ? item.about.join("\n") : item.name,
      brand: "Amazon Clone",
      ratingAvg: item.rating && parseFloat(item.rating) <= 5 ? parseFloat(item.rating) : 4.3,
      reviewCount: item.review ? parseInt(item.review, 10) || 100 : 100,
      categoryId: category.id,
      images: { create: [{ url: item.image, sortOrder: 0 }] },
      variants: {
        create: {
          sku: `CLONE-${cloneId}`,
          optionLabel: "Default",
          priceCents: priceToCents(item.price),
          stock: 50,
        },
      },
    },
    include: { variants: true },
  });

  return product.variants[0]!.id;
}
