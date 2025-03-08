import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DrillIcon as Drone, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Drone className="h-6 w-6" />
          <span>AgroDrone</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm ml-6">
          <Link href="/features" className="transition-colors hover:text-foreground/80">
            Features
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-foreground/80">
            Pricing
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <nav className="flex items-center gap-1">
            <Link href="/login" passHref>
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button size="sm">Sign Up</Button>
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="hover:text-foreground/80">
                  Home
                </Link>
                <Link href="/features" className="hover:text-foreground/80">
                  Features
                </Link>
                <Link href="/pricing" className="hover:text-foreground/80">
                  Pricing
                </Link>
                <Link href="/about" className="hover:text-foreground/80">
                  About
                </Link>
                <Link href="/contact" className="hover:text-foreground/80">
                  Contact
                </Link>
                <Link href="/login" className="hover:text-foreground/80">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-foreground/80">
                  Sign Up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

