// Remove the layout since navigation is now in the root layout

import type React from "react"

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

