import { prisma } from "@/lib/prisma";

export type AddressInput = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export function parseAddressForm(form: FormData): AddressInput {
  return {
    fullName: String(form.get("fullName") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    line1: String(form.get("line1") ?? "").trim(),
    line2: String(form.get("line2") ?? "").trim() || undefined,
    city: String(form.get("city") ?? "").trim(),
    state: String(form.get("state") ?? "").trim(),
    postalCode: String(form.get("postalCode") ?? "").trim(),
    country: String(form.get("country") ?? "IN").trim() || "IN",
  };
}

export function validateAddress(a: AddressInput): string | null {
  if (!a.fullName || !a.phone || !a.line1 || !a.city || !a.state || !a.postalCode) {
    return "Please fill in all required fields.";
  }
  return null;
}

export async function getDefaultAddress(userId: string) {
  return prisma.address.findFirst({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { id: "asc" }],
  });
}

export async function setDefaultAddress(userId: string, addressId: string) {
  await prisma.$transaction([
    prisma.address.updateMany({ where: { userId }, data: { isDefault: false } }),
    prisma.address.updateMany({ where: { id: addressId, userId }, data: { isDefault: true } }),
  ]);
}
