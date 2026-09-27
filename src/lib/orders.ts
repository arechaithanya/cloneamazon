import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const SHIPPING_CENTS = 0;
const TAX_RATE = 0;

export async function placeOrder(userId: string, simulatePaymentFail = false) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { lines: { include: { variant: { include: { product: true } } } } },
  });
  if (!cart || cart.lines.length === 0) {
    return { error: "Your cart is empty." as const };
  }

  const address = await prisma.address.findFirst({
    where: { userId },
    orderBy: { isDefault: "desc" },
  });
  if (!address) return { error: "Add a delivery address in Your Account." as const };

  for (const line of cart.lines) {
    if (line.variant.stock < line.quantity) {
      return { error: `Not enough stock for ${line.variant.product.title}.` as const };
    }
  }

  const subtotal = cart.lines.reduce((s, l) => s + l.variant.priceCents * l.quantity, 0);
  const taxCents = Math.round(subtotal * TAX_RATE);
  const totalCents = subtotal + SHIPPING_CENTS + taxCents;

  const status: OrderStatus = simulatePaymentFail ? "PAYMENT_FAILED" : "PAID";

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        status,
        subtotalCents: subtotal,
        shippingCents: SHIPPING_CENTS,
        taxCents,
        totalCents,
        shippingAddressSnapshot: {
          fullName: address.fullName,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        },
        lines: {
          create: cart.lines.map((l) => ({
            variantId: l.variantId,
            quantity: l.quantity,
            unitPriceCents: l.variant.priceCents,
            titleSnapshot: `${l.variant.product.title} (${l.variant.optionLabel})`,
          })),
        },
      },
    });

    if (!simulatePaymentFail) {
      for (const line of cart.lines) {
        await tx.productVariant.update({
          where: { id: line.variantId },
          data: { stock: { decrement: line.quantity } },
        });
      }
      await tx.cartLine.deleteMany({ where: { cartId: cart.id } });
    }

    return created;
  });

  return { order };
}

export function trackingSteps(status: OrderStatus) {
  const steps = ["Ordered", "Shipped", "Out for delivery", "Delivered"] as const;
  const index =
    status === "DELIVERED"
      ? 3
      : status === "SHIPPED"
        ? 1
        : status === "PAID" || status === "PENDING"
          ? 0
          : -1;
  return { steps, activeIndex: index };
}
