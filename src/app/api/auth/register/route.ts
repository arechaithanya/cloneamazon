import { registerUser } from "@/lib/auth";
import { AUTH_COOKIE } from "@/lib/constants";
import { createAuthToken } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");

  const result = await registerUser(email, password, name);
  if (result.error) {
    return NextResponse.redirect(new URL("/register?error=exists", request.url));
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(AUTH_COOKIE, createAuthToken(result.user.id), {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
