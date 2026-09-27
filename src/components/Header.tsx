import Link from "next/link";

type HeaderProps = {
  cartCount?: number;
  userName?: string | null;
};

export function Header({ cartCount = 0, userName }: HeaderProps) {
  return (
    <header className="bg-[#131921] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-3 py-2">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          amazon<span className="text-[#ff9900]">.rebuild</span>
        </Link>
        <div className="hidden text-xs text-gray-300 sm:block">
          <div className="text-gray-400">Deliver to</div>
          <div className="font-semibold text-white">Hyderabad 500081</div>
        </div>
        <form action="/search" className="order-3 flex flex-1 basis-full gap-0 sm:order-none sm:basis-auto">
          <input
            name="q"
            type="search"
            placeholder="Search products"
            className="w-full rounded-l-md border-0 px-3 py-2 text-sm text-black"
          />
          <button
            type="submit"
            className="rounded-r-md bg-[#febd69] px-4 py-2 text-sm font-medium text-black hover:bg-[#f3a847]"
          >
            Search
          </button>
        </form>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/account" className="hover:underline">
            <div className="text-xs text-gray-400">Hello, {userName ?? "sign in"}</div>
            <div className="font-semibold">Account & Lists</div>
          </Link>
          <Link href="/orders" className="hover:underline">
            <div className="text-xs text-gray-400">Returns</div>
            <div className="font-semibold">& Orders</div>
          </Link>
          <Link href="/cart" className="flex items-end gap-1 font-semibold hover:underline">
            <span className="text-2xl">🛒</span>
            <span className="text-[#febd69]">{cartCount}</span>
          </Link>
        </nav>
      </div>
      <div className="bg-[#232f3e] px-3 py-1.5 text-sm">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto whitespace-nowrap">
          <Link href="/category/shoes" className="hover:underline">Shoes</Link>
          <Link href="/category/deals" className="hover:underline">Today&apos;s Deals</Link>
          <Link href="/category/fashion" className="hover:underline">Fashion</Link>
          <span className="text-[#febd69]">Great Indian Festival — shop early deals</span>
        </div>
      </div>
    </header>
  );
}
