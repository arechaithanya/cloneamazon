import { getCartItemCount } from "@/lib/cart-service";
import { getCurrentUser } from "@/lib/auth";
import { Header } from "@/components/Header";

export async function AppHeader() {
  const [user, cartCount] = await Promise.all([getCurrentUser(), getCartItemCount()]);
  return <Header cartCount={cartCount} userName={user?.name ?? null} />;
}
