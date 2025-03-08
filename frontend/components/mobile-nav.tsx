"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
          <Leaf className="mr-2 h-6 w-6 text-green-500" />
          <span className="font-bold">AgroVision</span>
        </MobileLink>
        <div className="flex flex-col space-y-3 pt-6">
          <MobileLink
            href="/dashboard"
            onOpenChange={setOpen}
            className={cn(pathname === "/dashboard" && "text-foreground font-medium")}
          >
            Dashboard
          </MobileLink>
          <MobileLink
            href="/drones"
            onOpenChange={setOpen}
            className={cn(pathname === "/drones" && "text-foreground font-medium")}
          >
            Drones
          </MobileLink>
          <MobileLink
            href="/fields"
            onOpenChange={setOpen}
            className={cn(pathname === "/fields" && "text-foreground font-medium")}
          >
            Fields
          </MobileLink>
          <MobileLink
            href="/analytics"
            onOpenChange={setOpen}
            className={cn(pathname === "/analytics" && "text-foreground font-medium")}
          >
            Analytics
          </MobileLink>
          <MobileLink
            href="/settings"
            onOpenChange={setOpen}
            className={cn(pathname === "/settings" && "text-foreground font-medium")}
          >
            Settings
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const handleClick = () => {
    onOpenChange?.(false)
  }

  return (
    <Link href={href as string} onClick={handleClick} className={cn(className)} {...props}>
      {children}
    </Link>
  )
}

