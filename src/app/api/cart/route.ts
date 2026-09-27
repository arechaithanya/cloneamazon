import { addToCart, getOrCreateGuestCartId } from "@/lib/cart-service";
import { getAuthUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { GUEST_CART_COOKIE } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const action = String(form.get("action") ?? "add");
  const variantId = String(form.get("variantId") ?? "");
  const lineId = String(form.get("lineId") ?? "");
  const quantity = Math.max(1, parseInt(String(form.get("quantity") ?? "1"), 10) || 1);
  const redirectTo = String(form.get("redirect") ?? "/cart");

  const userId = await getAuthUserId();
  let cartId: string | undefined;
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

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

  if (action === "add" && variantId) {
    await addToCart(cartId, variantId, quantity);
    const dest = redirectTo === "checkout" ? "/checkout" : "/cart?added=1";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (action === "update" && lineId) {
    await prisma.cartLine.updateMany({
      where: { id: lineId, cartId },
      data: { quantity },
    });
    return NextResponse.redirect(new URL("/cart", request.url));
  }

  if (action === "remove" && lineId) {
    await prisma.cartLine.deleteMany({ where: { id: lineId, cartId } });
    return NextResponse.redirect(new URL("/cart", request.url));
  }

  return NextResponse.redirect(new URL("/cart", request.url));
}
