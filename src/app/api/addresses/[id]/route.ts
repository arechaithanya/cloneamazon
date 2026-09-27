import { getAuthUserId } from "@/lib/session";
import { parseAddressForm, validateAddress } from "@/lib/addresses";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Ctx) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.redirect(new URL("/login?next=/account/addresses", request.url));
  }

  const { id } = await params;
  const form = await request.formData();
  const action = String(form.get("action") ?? "update");

  const owned = await prisma.address.findFirst({ where: { id, userId } });
  if (!owned) {
    return NextResponse.redirect(new URL("/account/addresses", request.url));
  }

  if (action === "delete") {
    await prisma.address.delete({ where: { id } });
    const remaining = await prisma.address.findFirst({ where: { userId } });
    if (remaining && !remaining.isDefault) {
      await prisma.address.update({ where: { id: remaining.id }, data: { isDefault: true } });
    }
    return NextResponse.redirect(new URL("/account/addresses", request.url));
  }

  const input = parseAddressForm(form);
  const err = validateAddress(input);
  if (err) {
    return NextResponse.redirect(
      new URL(`/account/addresses?error=${encodeURIComponent(err)}&edit=${id}`, request.url),
    );
  }

  await prisma.address.update({
    where: { id },
    data: input,
  });

  if (form.get("isDefault") === "on") {
    await prisma.$transaction([
      prisma.address.updateMany({ where: { userId }, data: { isDefault: false } }),
      prisma.address.update({ where: { id }, data: { isDefault: true } }),
    ]);
  }

  return NextResponse.redirect(new URL("/account/addresses", request.url));
}
