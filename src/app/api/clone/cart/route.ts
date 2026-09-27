import { addToCart, getOrCreateGuestCartId } from "@/lib/cart-service";
import { ensureVariantForCloneId } from "@/lib/clone-catalog-sync";
import { getAuthenticatedUserId } from "@/lib/auth";
import { GUEST_CART_COOKIE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const cloneId = form.get("cloneId");
  const redirectTo = String(form.get("redirect") ?? "/CartPage");

  if (!cloneId) {
    return NextResponse.redirect(new URL("/CartPage", request.url), 303);
  }

  const variantId = await ensureVariantForCloneId(String(cloneId));
  const userId = await getAuthenticatedUserId();
  const response = NextResponse.redirect(new URL(redirectTo, request.url), 303);

  let cartId: string;
  if (userId) {
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) cart = await prisma.cart.create({ data: { userId } });
    cartId = cart.id;
  } else {
    const guest = await getOrCreateGuestCartId();
    cartId = guest.cartId;
    if (guest.newSessionId) {
      response.cookies.set(GUEST_CART_COOKIE, guest.newSessionId, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
  }

  await addToCart(cartId, variantId, 1);
  return response;
}
