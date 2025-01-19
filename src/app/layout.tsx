/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "Blogon",
  description: "A blog platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">
      <body>
        <ClerkProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>

  );
}
