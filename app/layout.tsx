import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felnic | Muebles a medida en Zona Norte",
  description:
    "Diseño y fabricación de muebles de melamina a medida. Cocinas, placares, racks, escritorios y muebles personalizados en Zona Norte.",
    verification: {
  google: "OGkpJ9YtV_kO0VJb5NmKCNn54D1U19G76y_Ndljlh_I",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
