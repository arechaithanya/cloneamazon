import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "amazon.rebuild",
  description: "Amazon-style storefront rebuild — assignment MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-3 py-4">{children}</main>
      </body>
    </html>
  );
}
