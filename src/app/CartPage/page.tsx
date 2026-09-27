import CartPageConnected from "@/clone/Pages/CartPageConnected";
import { getCart } from "@/lib/cart-service";

export const dynamic = "force-dynamic";

export default async function CartPageRoute() {
  const cart = await getCart();
  const lines = cart?.lines ?? [];
  return <CartPageConnected lines={lines} />;
}
