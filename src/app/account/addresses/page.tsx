import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { AddressFields } from "@/components/AddressFields";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string; edit?: string }> };

export default async function AddressesPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account/addresses");

  const { error, edit } = await searchParams;
  const editing = edit ? user.addresses.find((a) => a.id === edit) : null;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Your Addresses</h1>
        <Link href="/account" className="text-sm text-[#007185] underline">← Your Account</Link>
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-md border bg-white p-4">
          <h2 className="font-semibold">Add a new address</h2>
          <form action="/api/addresses" method="post" className="mt-3">
            <input type="hidden" name="action" value="create" />
            <AddressFields defaults={{ country: "IN" }} />
            <button
              type="submit"
              className="mt-3 w-full rounded-md bg-[#ffd814] py-2 text-sm font-medium hover:bg-[#f7ca00]"
            >
              Add address
            </button>
          </form>
        </section>

        <div className="space-y-4">
          {user.addresses.length === 0 && (
            <p className="rounded-md border bg-white p-4 text-sm text-gray-600">No saved addresses yet.</p>
          )}
          {user.addresses.map((a) => (
            <article key={a.id} className="rounded-md border bg-white p-4 text-sm">
              {editing?.id === a.id ? (
                <>
                  <h2 className="mb-2 font-semibold">Edit address</h2>
                  <form action={`/api/addresses/${a.id}`} method="post">
                    <input type="hidden" name="action" value="update" />
                    <AddressFields
                      defaults={{
                        fullName: a.fullName,
                        phone: a.phone,
                        line1: a.line1,
                        line2: a.line2 ?? "",
                        city: a.city,
                        state: a.state,
                        postalCode: a.postalCode,
                        country: a.country,
                        isDefault: a.isDefault,
                      }}
                    />
                    <div className="mt-3 flex gap-2">
                      <button type="submit" className="rounded-md bg-[#ffd814] px-3 py-1.5 text-sm font-medium">
                        Save
                      </button>
                      <Link href="/account/addresses" className="rounded border px-3 py-1.5 text-sm">Cancel</Link>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <p className="font-semibold">{a.fullName}</p>
                  <p>{a.line1}</p>
                  {a.line2 && <p>{a.line2}</p>}
                  <p>{a.city}, {a.state} {a.postalCode}</p>
                  <p>{a.country}</p>
                  <p className="mt-2">Phone: {a.phone}</p>
                  {a.isDefault && (
                    <p className="mt-2 text-xs font-semibold text-[#007185]">Default delivery address</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 text-[#007185]">
                    <Link href={`/account/addresses?edit=${a.id}`} className="underline">Edit</Link>
                    {!a.isDefault && (
                      <form action="/api/addresses" method="post" className="inline">
                        <input type="hidden" name="action" value="setDefault" />
                        <input type="hidden" name="addressId" value={a.id} />
                        <button type="submit" className="underline">Set as Default</button>
                      </form>
                    )}
                    <form action={`/api/addresses/${a.id}`} method="post" className="inline">
                      <input type="hidden" name="action" value="delete" />
                      <button type="submit" className="underline text-[#b12704]">Remove</button>
                    </form>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
