import { loginUser } from "@/lib/auth";
import { mergeGuestCartIntoUser } from "@/lib/cart-service";
import { AUTH_COOKIE, GUEST_CART_COOKIE } from "@/lib/constants";
import { createAuthToken } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return Response.redirect(new URL("/login", request.url));
}

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/");

  const result = await loginUser(email, password);
  const redirectUrl = new URL(result.error ? `/login?error=1&next=${encodeURIComponent(next)}` : next, request.url);
  const response = NextResponse.redirect(redirectUrl);

  if (result.error) return response;

  const jar = await cookies();
  const guestSession = jar.get(GUEST_CART_COOKIE)?.value;
  if (guestSession) {
    await mergeGuestCartIntoUser(result.user.id, guestSession);
    response.cookies.delete(GUEST_CART_COOKIE);
  }

  response.cookies.set(AUTH_COOKIE, createAuthToken(result.user.id), {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
