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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white min-h-screen antialiased" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}