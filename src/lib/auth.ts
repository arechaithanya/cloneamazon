import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "@/lib/session";

/** Ignore session cookies that point at users removed by db reseed. */
export async function getAuthenticatedUserId(): Promise<string | null> {
  const userId = await getAuthUserId();
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  return user?.id ?? null;
}

export async function getCurrentUser() {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      addresses: { orderBy: { isDefault: "desc" } },
    },
  });
}

export async function registerUser(email: string, password: string, name: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with this email already exists." as const };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      cart: { create: {} },
      addresses: {
        create: {
          fullName: name,
          phone: "+91 90000 00000",
          line1: "12 MG Road",
          city: "Hyderabad",
          state: "Telangana",
          postalCode: "500081",
          country: "IN",
          isDefault: true,
        },
      },
    },
  });
  return { user };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Invalid email or password." as const };
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return { error: "Invalid email or password." as const };
  return { user };
}
