import { getCartItemCount } from "@/lib/cart-service";
import { NextResponse } from "next/server";

export async function GET() {
  const count = await getCartItemCount();
  return NextResponse.json({ count });
}
