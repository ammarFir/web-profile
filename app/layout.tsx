import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ammar Fir - Web Developer",
  description: "Portofolio & layanan development profesional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-black text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}