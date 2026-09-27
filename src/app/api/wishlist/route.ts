import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.redirect(new URL("/login?next=/wishlist", request.url));
  }

  const form = await request.formData();
  const action = String(form.get("action") ?? "add");
  const variantId = String(form.get("variantId") ?? "");
  const itemId = String(form.get("itemId") ?? "");
  const redirect = String(form.get("redirect") ?? "/wishlist");

  if (action === "add" && variantId) {
    await prisma.wishlistItem.upsert({
      where: { userId_variantId: { userId, variantId } },
      create: { userId, variantId },
      update: {},
    });
  }

  if (action === "remove" && itemId) {
    await prisma.wishlistItem.deleteMany({ where: { id: itemId, userId } });
  }

  if (action === "moveToCart" && itemId) {
    const item = await prisma.wishlistItem.findFirst({ where: { id: itemId, userId } });
    if (item) {
      let cart = await prisma.cart.findUnique({ where: { userId } });
      if (!cart) cart = await prisma.cart.create({ data: { userId } });
      const existing = await prisma.cartLine.findUnique({
        where: { cartId_variantId: { cartId: cart.id, variantId: item.variantId } },
      });
      if (existing) {
        await prisma.cartLine.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + 1 },
        });
      } else {
        await prisma.cartLine.create({
          data: { cartId: cart.id, variantId: item.variantId, quantity: 1 },
        });
      }
      await prisma.wishlistItem.delete({ where: { id: item.id } });
    }
  }

  return NextResponse.redirect(new URL(redirect, request.url));
}
