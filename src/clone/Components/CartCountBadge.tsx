"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function CartCountBadge() {
  const [count, setCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/cart/count", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0));
  }, [pathname]);

  return <span className="px-2 py-0 text-base text-[#f08804]">{count}</span>;
}
