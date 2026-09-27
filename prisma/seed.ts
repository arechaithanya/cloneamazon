import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const IMG = {
  jordan:
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
  runner:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  nb: "https://images.unsplash.com/photo-1606107557195-0f29cb4f3f2f?w=800&q=80",
  asics:
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  court:
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
};

type SeedProduct = {
  title: string;
  slug: string;
  brand: string;
  description: string;
  isDeal?: boolean;
  ratingAvg: number;
  reviewCount: number;
  image: string;
  variants: {
    sku: string;
    optionLabel: string;
    priceCents: number;
    listPriceCents?: number;
    stock: number;
  }[];
};

const sneakers: SeedProduct[] = [
  {
    title: "Jordan High G Pollen Sneakers",
    slug: "jordan-high-g-pollen",
    brand: "Jordan",
    description:
      "High-top lifestyle sneaker with pollen, white, and black color blocking. Limited-time deal styling.",
    isDeal: true,
    ratingAvg: 4.6,
    reviewCount: 128,
    image: IMG.jordan,
    variants: [
      { sku: "JDN-POLLEN-9", optionLabel: "9 UK", priceCents: 1291500, listPriceCents: 1499900, stock: 5 },
      { sku: "JDN-POLLEN-95", optionLabel: "9.5 UK", priceCents: 1291500, listPriceCents: 1499900, stock: 5 },
      { sku: "JDN-POLLEN-10", optionLabel: "10 UK", priceCents: 1291500, stock: 8 },
    ],
  },
  {
    title: "New Balance 530 Casual Shoe",
    slug: "new-balance-530-green",
    brand: "New Balance",
    description: "Retro-inspired daily trainer with breathable mesh upper.",
    ratingAvg: 4.4,
    reviewCount: 892,
    image: IMG.nb,
    variants: [
      { sku: "NB530-11", optionLabel: "11 UK", priceCents: 719900, stock: 2 },
      { sku: "NB530-10", optionLabel: "10 UK", priceCents: 719900, stock: 4 },
    ],
  },
  {
    title: "New Balance CT300 Lifestyle",
    slug: "new-balance-ct300-green",
    brand: "New Balance",
    description: "Classic court silhouette with green and white palette.",
    ratingAvg: 4.3,
    reviewCount: 412,
    image: IMG.court,
    variants: [
      { sku: "CT300-105", optionLabel: "10.5 UK", priceCents: 379800, stock: 3 },
    ],
  },
  {
    title: "ASICS GEL-1130 Sneakers",
    slug: "asics-gel-1130",
    brand: "ASICS",
    description: "Unisex GEL cushioning with pale oak and menthol accents.",
    isDeal: true,
    ratingAvg: 4.4,
    reviewCount: 548,
    image: IMG.asics,
    variants: [
      { sku: "GEL1130-5", optionLabel: "5 UK", priceCents: 669900, stock: 1 },
      { sku: "GEL1130-8", optionLabel: "8 UK", priceCents: 669900, stock: 6 },
    ],
  },
  {
    title: "Nike Court Vision Mid",
    slug: "nike-court-vision-mid",
    brand: "Nike",
    description: "Mid-top sneaker inspired by classic basketball style.",
    ratingAvg: 4.2,
    reviewCount: 2103,
    image: IMG.court,
    variants: [
      { sku: "CVM-9", optionLabel: "9 UK", priceCents: 583600, listPriceCents: 699900, stock: 12 },
    ],
  },
  {
    title: "Velocity Run Lite",
    slug: "velocity-run-lite",
    brand: "ASIAN",
    description: "Lightweight running shoe for everyday miles.",
    ratingAvg: 3.9,
    reviewCount: 1400,
    image: IMG.runner,
    variants: [
      { sku: "VEL-8", optionLabel: "8 UK", priceCents: 109900, stock: 50 },
      { sku: "VEL-9", optionLabel: "9 UK", priceCents: 109900, stock: 50 },
    ],
  },
];

async function main() {
  await prisma.cartLine.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.orderLine.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  const fashion = await prisma.category.create({ data: { name: "Fashion", slug: "fashion" } });
  const shoes = await prisma.category.create({
    data: { name: "Shoes", slug: "shoes", parentId: fashion.id },
  });
  const deals = await prisma.category.create({ data: { name: "Deals", slug: "deals" } });

  for (const p of sneakers) {
    const categoryId = p.isDeal ? deals.id : shoes.id;
    const product = await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        brand: p.brand,
        description: p.description,
        isDeal: p.isDeal ?? false,
        ratingAvg: p.ratingAvg,
        reviewCount: p.reviewCount,
        categoryId,
        images: { create: [{ url: p.image, sortOrder: 0 }] },
        variants: { create: p.variants },
        reviews: {
          create: [
            {
              rating: 5,
              title: "Great fit",
              body: "Comfortable for all-day wear. True to size.",
              verifiedPurchase: true,
            },
            {
              rating: 4,
              title: "Solid quality",
              body: "Looks exactly like the photos. Delivery was fast.",
              verifiedPurchase: true,
            },
          ],
        },
      },
    });
    console.log("Seeded", product.slug);
  }

  const passwordHash = await bcrypt.hash("demo1234", 10);
  const demo = await prisma.user.create({
    data: {
      email: "demo@amazon-rebuild.test",
      name: "Demo Shopper",
      passwordHash,
      addresses: {
        create: {
          fullName: "Demo Shopper",
          phone: "+91 90000 00000",
          line1: "12 MG Road",
          city: "Hyderabad",
          state: "Telangana",
          postalCode: "500081",
          country: "IN",
          isDefault: true,
        },
      },
      cart: { create: {} },
    },
  });

  console.log("Demo user:", demo.email, "/ password: demo1234");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
