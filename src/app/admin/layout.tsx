import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Toaster } from "@/components/ui/sonner";
import { LoadingScreen } from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard | TALANTA",
  description: "Admin dashboard for TALANTA platform",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-deep-black text-foreground selection:bg-neon-green selection:text-deep-black`}
      >
        <LoadingScreen />
        <div className="scanline" aria-hidden="true" />
        <main>
          {children}
        </main>
        <Toaster theme="dark" position="bottom-right" richColors />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
