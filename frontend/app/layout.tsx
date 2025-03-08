import type React from "react"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { PageHeader } from "@/components/page-header"
import { FloatingChatButton } from "@/components/floating-chat-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgroVision - Smart Farming Dashboard",
  description: "Real-time drone monitoring for agricultural fields",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <PageHeader title="AgroVision" />
          <div className="flex flex-1">
            <aside className="hidden w-64 border-r bg-muted/40 md:block">
              <div className="p-4">
                <DashboardNav />
              </div>
            </aside>
            <main className="flex-1">{children}</main>
          </div>
          <FloatingChatButton />
        </div>
      </body>
    </html>
  )
}



import './globals.css'