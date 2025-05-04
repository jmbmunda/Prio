import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prio",
  description: "Made by JM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendSans.className} antialiased bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
