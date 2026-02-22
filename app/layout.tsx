import type { Metadata } from "next";
import localfont from "next/font/local";
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

const soria = localfont({
  src: [{
    path: "../public/fonts/Soria.ttf",
    weight: "700",
  }],
  variable: "--font-soria"
})

export const metadata: Metadata = {
  title: "Appointy App",
  description: "Appointments Handled",
  // icons: { icon: "./neko.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soria.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
