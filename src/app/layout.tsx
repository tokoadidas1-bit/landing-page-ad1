import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Landing Page AD1 - Kerja dari Rumah",
  description: "Landing Page AD1 - Kesempatan kerja online dari rumah dengan penghasilan menarik. Cocok untuk freelancer dan mahasiswa di seluruh Indonesia.",
  keywords: ["Landing Page AD1", "kerja dari rumah", "kerja online", "freelancer", "penghasilan tambahan", "WFH"],
  authors: [{ name: "AD1 Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Landing Page AD1 - Kerja dari Rumah",
    description: "Kesempatan kerja online dari rumah dengan penghasilan menarik. Cocok untuk freelancer dan mahasiswa.",
    url: "https://landing-page-ad1.com",
    siteName: "Landing Page AD1",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Page AD1 - Kerja dari Rumah",
    description: "Kesempatan kerja online dari rumah dengan penghasilan menarik.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
