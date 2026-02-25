import type { Metadata } from "next";
import localfont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const soria = localfont({
  src: [{ path: "../public/fonts/Soria.ttf", weight: "700" }],
  variable: "--font-soria",
});

export const metadata: Metadata = {
  title: "Appointly",
  description: "WhatsApp-native appointment management for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${soria.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
