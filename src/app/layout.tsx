import type { Metadata } from "next";
import "./globals.css";
import { CloneProviders } from "./CloneProviders";

export const metadata: Metadata = {
  title: "Amazon Clone",
  description: "Amazon-style storefront (amazon-clone-react)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <CloneProviders>{children}</CloneProviders>
      </body>
    </html>
  );
}
