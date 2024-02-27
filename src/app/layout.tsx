import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notifio",
  description: "A sms and email management service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className="flex justify-between max-w-2xl mx-auto py-6 px-4">
            <h2 className="font-bold text-xl">Notifio</h2>
            <div className="flex gap-8 items-center ">
              <Link className="font-semibold hover:underline" href="/">
                Home
              </Link>
              <Button>Sign in</Button>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
