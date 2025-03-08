"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, Map, DrillIcon as Drone, Lightbulb, BarChart3 } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Fields",
    href: "/fields",
    icon: Map,
  },
  {
    title: "Drones",
    href: "/drones",
    icon: Drone,
  },
  {
    title: "Insights",
    href: "/insights",
    icon: Lightbulb,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Drone className="h-5 w-5" />
            <span>AgroDrone</span>
          </Link>
        </div>
        <div className="grid gap-2 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-7 py-2 text-sm font-medium hover:text-primary",
                pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

