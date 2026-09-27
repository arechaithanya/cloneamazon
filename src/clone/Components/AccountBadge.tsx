'use client';
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export function AccountBadge() {
  const [name, setName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.name && setName(d.name))
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (name) {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-[12px] p-2 h-12 border border-transparent hover:border-white text-white text-left"
        >
          <span className="text-[#f08804] font-semibold block">Hello, {name.split(" ")[0]}</span>
          <span className="font-semibold capitalize block">Account & List ▾</span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-[9999] w-48 rounded-sm bg-white shadow-lg text-[#0f1111] text-sm">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-[#0f1111]">{name}</p>
            </div>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-[#f3f3f3] text-[#007185] no-underline"
            >
              Your Account
            </Link>
            <Link
              href="/orders"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-[#f3f3f3] text-[#007185] no-underline"
            >
              Your Orders
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-[#f3f3f3] text-[#007185] no-underline"
            >
              Your Wish List
            </Link>
            <div className="border-t border-gray-100 mt-1">
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="w-full text-left px-4 py-2 hover:bg-[#f3f3f3] text-[#cc0c39] font-semibold"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href="/login" className="text-[12px] p-2 h-12 border border-transparent hover:border-white text-white no-underline">
      <span>Hello, <span>Sign in</span></span>
      <p className="font-semibold capitalize">Account & List</p>
    </Link>
  );
}
