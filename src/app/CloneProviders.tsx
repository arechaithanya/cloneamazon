"use client";

import { usePathname } from "next/navigation";
import Context from "@/clone/ContextApi/Context";
import Header from "@/clone/Components/Header";
import Footer from "@/clone/Components/Footer";

export function CloneProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalonePrime = pathname?.startsWith("/prime-video");

  return (
    <Context>
      {!standalonePrime && <Header />}
      <div className={standalonePrime ? "" : "text-[#0f1111]"}>{children}</div>
      {!standalonePrime && <Footer />}
    </Context>
  );
}
