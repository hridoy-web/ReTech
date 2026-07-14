import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ReTech | Premium Pre-owned Tech Marketplace",
  description: "Buy and sell verified pre-owned gadgets seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="font-sans min-h-full flex flex-col bg-white text-slate-900 selection:bg-brand-primary/20">
        <Navbar />

        <main className="grow">
          {children}
        </main>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}