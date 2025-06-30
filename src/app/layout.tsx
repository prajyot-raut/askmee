import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Askmee",
  description: "A simple Quiz App",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-oid="st:ky0l">
      <body className="antialiased" data-oid="k-gx1l5">
        {children}
      </body>
    </html>
  );
}
