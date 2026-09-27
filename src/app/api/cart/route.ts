import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const SESSION_COOKIE = "guest_session";

export async function POST(request: Request) {
  const form = await request.formData();
  const variantId = String(form.get("variantId") ?? "");
  if (!variantId) {
    return NextResponse.redirect(new URL("/cart", request.url));
  }

  const jar = await cookies();
  let sessionId = jar.get(SESSION_COOKIE)?.value;
  const response = NextResponse.redirect(new URL("/cart?added=1", request.url));

  if (!sessionId) {
    sessionId = randomUUID();
    response.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  let cart = await prisma.cart.findUnique({ where: { sessionId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId } });
  }
  const existing = await prisma.cartLine.findUnique({
    where: { cartId_variantId: { cartId: cart.id, variantId } },
  });

  if (existing) {
    await prisma.cartLine.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
    });
  } else {
    await prisma.cartLine.create({
      data: { cartId: cart.id, variantId, quantity: 1 },
    });
  }

  return response;
}
