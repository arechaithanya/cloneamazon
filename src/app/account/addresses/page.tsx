import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AddressesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account/addresses");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Your Addresses</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed bg-white text-gray-500">
          + Add address (Phase 4)
        </div>
        {user.addresses.map((a) => (
          <div key={a.id} className="rounded-md border bg-white p-4 text-sm">
            <p className="font-semibold">{a.fullName}</p>
            <p>{a.line1}</p>
            {a.line2 && <p>{a.line2}</p>}
            <p>{a.city}, {a.state} {a.postalCode}</p>
            <p>{a.country}</p>
            <p className="mt-2">Phone: {a.phone}</p>
            {a.isDefault && <p className="mt-2 text-xs font-semibold text-[#007185]">Default</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
