// app/layout.tsx
import type React from "react";
import ClientAuthWrapper from "./ClientAuthWrapper";
import LayoutWrapper from "./LayoutWrapper";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroVision - Smart Farming Dashboard",
  description: "Real-time drone monitoring for agricultural fields",
  generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ClientAuthWrapper>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ClientAuthWrapper>
      </body>
    </html>
  );
}
