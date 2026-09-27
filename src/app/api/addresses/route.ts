import { getAuthenticatedUserId } from "@/lib/auth";
import {
  parseAddressForm,
  setDefaultAddress,
  validateAddress,
} from "@/lib/addresses";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.redirect(new URL("/login?next=/account/addresses", request.url));
  }

  const form = await request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const input = parseAddressForm(form);
    const err = validateAddress(input);
    if (err) {
      return NextResponse.redirect(
        new URL(`/account/addresses?error=${encodeURIComponent(err)}`, request.url),
      );
    }
    const makeDefault = form.get("isDefault") === "on";
    const count = await prisma.address.count({ where: { userId } });
    await prisma.address.create({
      data: {
        userId,
        ...input,
        isDefault: makeDefault || count === 0,
      },
    });
    if (makeDefault) {
      const created = await prisma.address.findFirst({
        where: { userId },
        orderBy: { id: "desc" },
      });
      if (created) await setDefaultAddress(userId, created.id);
    }
  }

  if (action === "setDefault") {
    const addressId = String(form.get("addressId") ?? "");
    if (addressId) await setDefaultAddress(userId, addressId);
  }

  return NextResponse.redirect(new URL("/account/addresses", request.url));
}
