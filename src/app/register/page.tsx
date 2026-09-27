import Link from "next/link";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function RegisterPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md rounded-md border bg-white p-6">
      <h1 className="text-2xl font-semibold">Create account</h1>
      {error && <p className="mt-2 text-sm text-red-700">Email already registered.</p>}
      <form action="/api/auth/register" method="post" className="mt-4 space-y-3">
        <label className="block text-sm">
          Your name
          <input name="name" required className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <label className="block text-sm">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <label className="block text-sm">
          Password
          <input name="password" type="password" required minLength={6} className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <button type="submit" className="w-full rounded-md bg-[#ffd814] py-2 font-medium hover:bg-[#f7ca00]">
          Create your Amazon.rebuild account
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account? <Link href="/login" className="text-[#007185] underline">Sign in</Link>
      </p>
    </div>
  );
}
