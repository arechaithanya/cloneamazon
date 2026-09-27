import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const tiles = [
    { title: "Your Orders", href: "/orders", desc: "Track, return, or buy again" },
    { title: "Login & security", href: "/login", desc: "Email and password" },
    { title: "Your Addresses", href: "/account/addresses", desc: "Delivery addresses" },
    { title: "Payment methods", href: "/account/payments", desc: "Wallet and cards (stub)" },
    { title: "Your Lists", href: "/wishlist", desc: "Shopping List" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Account</h1>
      <p className="text-sm text-gray-600">Hello, {user.name}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-md border bg-white p-4 hover:bg-gray-50"
          >
            <h2 className="font-semibold">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.desc}</p>
          </Link>
        ))}
      </div>
      <form action="/api/auth/logout" method="post" className="mt-8">
        <button type="submit" className="text-sm text-[#007185] underline">Sign out</button>
      </form>
    </div>
  );
}
