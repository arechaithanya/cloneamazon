import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PaymentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account/payments");

  return (
    <div className="max-w-xl rounded-md border bg-white p-6">
      <h1 className="text-xl font-semibold">Wallet</h1>
      <p className="mt-2 text-sm text-gray-600">Amazon Pay balance: ₹0.00 (stub)</p>
      <h2 className="mt-6 font-semibold">Your credit / debit cards</h2>
      <p className="text-sm text-gray-600">No cards on file. Checkout uses simulated payment.</p>
    </div>
  );
}
