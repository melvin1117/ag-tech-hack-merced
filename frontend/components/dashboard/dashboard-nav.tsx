"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChartArea, Cog, Flower2, Home, Leaf, Map, Plane, Wheat } from "lucide-react"

import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-2 py-4">
        <Leaf className="h-6 w-6 text-green-500" />
        <span className="text-lg font-bold">AgroVision</span>
      </div>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/dashboard" ? "bg-accent" : "transparent",
          )}
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/recommendations"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/recommendations" ? "bg-accent" : "transparent",
          )}
        >
          <Wheat className="h-4 w-4" />
          <span>Crop Recommendations</span>
        </Link>
        <Link
          href="/drones"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/drones" ? "bg-accent" : "transparent",
          )}
        >
          <Plane className="h-4 w-4" />
          <span>Drone</span>
        </Link>
        <Link
          href="/fields"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/fields" ? "bg-accent" : "transparent",
          )}
        >
          <ChartArea className="h-4 w-4" />
          <span>Reports</span>
        </Link>
        <Link
          href="/analytics"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/analytics" ? "bg-accent" : "transparent",
          )}
        >
          <Flower2 className="h-4 w-4" />
          <span>Bee Guide</span>
        </Link>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === "/settings" ? "bg-accent" : "transparent",
          )}
        >
          <Cog className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

