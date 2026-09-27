import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export type ProductCardData = {
  id: string;
  slug: string;
  title: string;
  brand: string | null;
  ratingAvg: number;
  reviewCount: number;
  isDeal: boolean;
  imageUrl: string | null;
  priceCents: number;
  listPriceCents: number | null;
};

const productCardSelect = {
  id: true,
  slug: true,
  title: true,
  brand: true,
  ratingAvg: true,
  reviewCount: true,
  isDeal: true,
  images: { orderBy: { sortOrder: "asc" }, take: 1 },
  variants: { orderBy: { priceCents: "asc" }, take: 1 },
} satisfies Prisma.ProductSelect;

function toCard(p: {
  id: string;
  slug: string;
  title: string;
  brand: string | null;
  ratingAvg: number;
  reviewCount: number;
  isDeal: boolean;
  images: { url: string }[];
  variants: { priceCents: number; listPriceCents: number | null }[];
}): ProductCardData {
  const v = p.variants[0];
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    ratingAvg: p.ratingAvg,
    reviewCount: p.reviewCount,
    isDeal: p.isDeal,
    imageUrl: p.images[0]?.url ?? null,
    priceCents: v?.priceCents ?? 0,
    listPriceCents: v?.listPriceCents ?? null,
  };
}

export async function getFeaturedProducts(limit = 12) {
  const rows = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    select: productCardSelect,
  });
  return rows.map(toCard);
}

export async function getDealProducts(limit = 8) {
  const rows = await prisma.product.findMany({
    where: { isDeal: true },
    take: limit,
    select: productCardSelect,
  });
  return rows.map(toCard);
}

export async function searchProducts(query: string, sort: "featured" | "price-asc" | "price-desc") {
  const where: Prisma.ProductWhereInput = query
    ? {
        OR: [
          { title: { contains: query } },
          { brand: { contains: query } },
          { description: { contains: query } },
        ],
      }
    : {};

  const rows = await prisma.product.findMany({
    where,
    select: productCardSelect,
    orderBy:
      sort === "price-asc" || sort === "price-desc"
        ? { variants: { _count: "desc" } }
        : { reviewCount: "desc" },
  });

  let cards = rows.map(toCard);
  if (sort === "price-asc") cards = cards.sort((a, b) => a.priceCents - b.priceCents);
  if (sort === "price-desc") cards = cards.sort((a, b) => b.priceCents - a.priceCents);
  return cards;
}

export async function getProductsByCategory(slug: string) {
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { category: null, products: [] as ProductCardData[] };

  const rows = await prisma.product.findMany({
    where: { categoryId: category.id },
    select: productCardSelect,
    orderBy: { title: "asc" },
  });

  return { category, products: rows.map(toCard) };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { optionLabel: "asc" } },
      reviews: { orderBy: { rating: "desc" }, take: 8 },
    },
  });
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 6) {
  const rows = await prisma.product.findMany({
    where: { categoryId, id: { not: excludeId } },
    take: limit,
    select: productCardSelect,
  });
  return rows.map(toCard);
}
