import type React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

/**
 * A unified container component for page content
 * Replaces multiple similar container components across the app
 */
export function PageContainer({ children, className, fullWidth = false }: PageContainerProps) {
  return (
    <div className={cn("flex-1 space-y-4 p-4 md:p-8", fullWidth ? "w-full" : "container mx-auto", className)}>
      {children}
    </div>
  )
}

