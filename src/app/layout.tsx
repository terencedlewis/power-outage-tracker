import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/components/LanguageProvider";
import MobileLanguagePill from "@/components/MobileLanguagePill";
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
  title: "Utility Outage Tracker",
  description: "Real-time community utility outage reporting",
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
      <body className="min-h-full flex flex-col text-[color:var(--foreground)]">
        <LanguageProvider>
          {children}
          <MobileLanguagePill />
          <Toaster position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
