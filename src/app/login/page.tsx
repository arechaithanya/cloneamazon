import Link from "next/link";

type Props = { searchParams: Promise<{ next?: string; error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next = "/", error } = await searchParams;

  return (
    <div className="mx-auto max-w-md rounded-md border bg-white p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {error && <p className="mt-2 text-sm text-red-700">Invalid email or password.</p>}
      <form action="/api/auth/login" method="post" className="mt-4 space-y-3">
        <input type="hidden" name="next" value={next} />
        <label className="block text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="demo@amazon-rebuild.test"
          />
        </label>
        <label className="block text-sm">
          Password
          <input name="password" type="password" required className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <button type="submit" className="w-full rounded-md bg-[#ffd814] py-2 font-medium hover:bg-[#f7ca00]">
          Sign in
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        New? <Link href="/register" className="text-[#007185] underline">Create your account</Link>
      </p>
      <p className="mt-2 text-xs text-gray-500">Demo: demo@amazon-rebuild.test / demo1234</p>
    </div>
  );
}
