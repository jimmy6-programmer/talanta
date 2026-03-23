import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TALANTA | Elite Software Engineering Training",
  description: "Next-generation platform for mastering software engineering with a cyberpunk aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-deep-black text-foreground selection:bg-neon-green selection:text-deep-black`}
      >
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
