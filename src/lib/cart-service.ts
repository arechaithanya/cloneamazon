import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { GUEST_CART_COOKIE } from "@/lib/constants";
import { getAuthenticatedUserId } from "@/lib/auth";

const cartInclude = {
  lines: {
    include: {
      variant: {
        include: {
          product: {
            include: {
              images: { orderBy: { sortOrder: "asc" as const }, take: 1 },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.CartInclude;

export type CartWithLines = Prisma.CartGetPayload<{ include: typeof cartInclude }>;

export async function getCart(): Promise<CartWithLines | null> {
  const userId = await getAuthenticatedUserId();
  const jar = await cookies();

  if (userId) {
    const existing = await prisma.cart.findUnique({ where: { userId }, include: cartInclude });
    if (existing) return existing;
    return prisma.cart.create({
      data: { userId },
      include: cartInclude,
    });
  }

  const sessionId = jar.get(GUEST_CART_COOKIE)?.value;
  if (!sessionId) return null;
  return prisma.cart.findUnique({ where: { sessionId }, include: cartInclude });
}

export async function getOrCreateGuestCartId(): Promise<{ cartId: string; newSessionId?: string }> {
  const jar = await cookies();
  let sessionId = jar.get(GUEST_CART_COOKIE)?.value;
  if (!sessionId) {
    sessionId = randomUUID();
  }
  let cart = await prisma.cart.findUnique({ where: { sessionId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId } });
  }
  const newSessionId = jar.get(GUEST_CART_COOKIE)?.value ? undefined : sessionId;
  return { cartId: cart.id, newSessionId };
}

export async function getCartItemCount(): Promise<number> {
  const cart = await getCart();
  if (!cart) return 0;
  return cart.lines.reduce((n, l) => n + l.quantity, 0);
}

export async function mergeGuestCartIntoUser(userId: string, guestSessionId: string) {
  const guestCart = await prisma.cart.findUnique({
    where: { sessionId: guestSessionId },
    include: { lines: true },
  });
  if (!guestCart || guestCart.lines.length === 0) return;

  let userCart = await prisma.cart.findUnique({ where: { userId } });
  if (!userCart) {
    userCart = await prisma.cart.create({ data: { userId } });
  }

  for (const line of guestCart.lines) {
    const existing = await prisma.cartLine.findUnique({
      where: { cartId_variantId: { cartId: userCart.id, variantId: line.variantId } },
    });
    if (existing) {
      await prisma.cartLine.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + line.quantity },
      });
    } else {
      await prisma.cartLine.create({
        data: { cartId: userCart.id, variantId: line.variantId, quantity: line.quantity },
      });
    }
  }

  await prisma.cartLine.deleteMany({ where: { cartId: guestCart.id } });
  await prisma.cart.delete({ where: { id: guestCart.id } });
}

export async function addToCart(cartId: string, variantId: string, qty = 1) {
  const existing = await prisma.cartLine.findUnique({
    where: { cartId_variantId: { cartId, variantId } },
  });
  if (existing) {
    await prisma.cartLine.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + qty },
    });
  } else {
    await prisma.cartLine.create({ data: { cartId, variantId, quantity: qty } });
  }
}
