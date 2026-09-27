'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

export function AccountBadge() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.name && setName(d.name))
      .catch(() => {});
  }, []);

  if (name) {
    return (
      <Link href="/account" className="text-[12px] p-2 h-12 border border-transparent hover:border-white text-white no-underline">
        <span className="text-[#f08804] font-semibold">Hello, {name.split(" ")[0]}</span>
        <p className="font-semibold capitalize">Account & List</p>
      </Link>
    );
  }

  return (
    <Link href="/login" className="text-[12px] p-2 h-12 border border-transparent hover:border-white text-white no-underline">
      <span>Hello, <span>Sign in</span></span>
      <p className="font-semibold capitalize">Account & List</p>
    </Link>
  );
}
