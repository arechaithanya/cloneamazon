import { getAuthenticatedUserId } from "@/lib/auth";
import { placeOrder } from "@/lib/orders";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.redirect(new URL("/login?next=/checkout", request.url), 303);
  }

  const form = await request.formData();
  const simulatePaymentFail = form.get("simulatePaymentFail") === "on";

  const result = await placeOrder(userId, simulatePaymentFail);
  if (result.error) {
    return NextResponse.redirect(new URL(`/checkout?error=${encodeURIComponent(result.error)}`, request.url), 303);
  }

  return NextResponse.redirect(new URL(`/orders/${result.order.id}?placed=1`, request.url), 303);
}
