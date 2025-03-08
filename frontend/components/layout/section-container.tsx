import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SectionContainerProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  contentClassName?: string
  headerClassName?: string
  headerAction?: React.ReactNode
  plain?: boolean
}

/**
 * A unified container component for content sections
 * Can be rendered as a Card (default) or as a plain div
 */
export function SectionContainer({
  children,
  title,
  description,
  className,
  contentClassName,
  headerClassName,
  headerAction,
  plain = false,
}: SectionContainerProps) {
  if (plain) {
    return (
      <div className={cn("space-y-4", className)}>
        {(title || description || headerAction) && (
          <div className={cn("flex items-center justify-between", headerClassName)}>
            <div>
              {title && <h2 className="text-xl font-semibold">{title}</h2>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {headerAction}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    )
  }

  return (
    <Card className={className}>
      {(title || description || headerAction) && (
        <CardHeader className={cn("flex flex-row items-center justify-between space-y-0", headerClassName)}>
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction}
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  )
}

