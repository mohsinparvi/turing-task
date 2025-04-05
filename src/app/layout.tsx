import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/layouts/header";
import { AuthProvider } from "@/lib/hooks/use-auth";

const avenirltstdBlackFont = localFont({
  src: "../assets/fonts/AvenirLTStd-Black.otf",
  display: "swap", // This will show fallback font while loading
  preload: true, // Ensures font is loaded in initial page load
  variable: "--font-aveniltstd-black", // Optional: for CSS variable usage
});
const avenirltstdBookFont = localFont({
  src: "../assets/fonts/AvenirLTStd-Book.otf",
  display: "swap", // This will show fallback font while loading
  preload: true, // Ensures font is loaded in initial page load
  variable: "--font-aveniltstd-book", // Optional: for CSS variable usage
});
const avenirltstdRomanFont = localFont({
  src: "../assets/fonts/AvenirLTStd-Roman.otf",
  display: "swap", // This will show fallback font while loading
  preload: true, // Ensures font is loaded in initial page load
  variable: "--font-aveniltstd-book", // Optional: for CSS variable usage
});

export const metadata: Metadata = {
  title: "Turing Technologies Frontend Test",
  description: "Turing Technologies Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${avenirltstdBlackFont.variable} ${avenirltstdBookFont.variable} ${avenirltstdRomanFont.variable} antialiased`}
      >
        <AuthProvider>
          <Header />

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
