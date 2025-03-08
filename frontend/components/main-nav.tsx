"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Wheat, LineChart, Settings, Plane } from "lucide-react"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Fields",
      href: "/fields",
      icon: Wheat,
    },
    {
      name: "Insights",
      href: "/insights",
      icon: LineChart,
    },
    {
      name: "Drones",
      href: "/drones",
      icon: Plane,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex", className)} {...props}>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

