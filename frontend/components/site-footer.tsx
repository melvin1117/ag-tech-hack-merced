import Link from "next/link"
import { DrillIcon as Drone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Drone className="h-6 w-6" />
            <span>AgroDrone</span>
          </Link>
          <p className="text-sm text-muted-foreground">Smart farming with drone technology</p>
        </div>
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
          <div className="grid gap-2 text-sm">
            <h3 className="font-medium">Product</h3>
            <Link href="/features" className="text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/demo" className="text-muted-foreground hover:text-foreground">
              Demo
            </Link>
          </div>
          <div className="grid gap-2 text-sm">
            <h3 className="font-medium">Company</h3>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/careers" className="text-muted-foreground hover:text-foreground">
              Careers
            </Link>
          </div>
          <div className="grid gap-2 text-sm">
            <h3 className="font-medium">Resources</h3>
            <Link href="/documentation" className="text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground">
              Support
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
          <div className="grid gap-2 text-sm">
            <h3 className="font-medium">Legal</h3>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 border-t py-6 md:h-16 md:flex-row md:py-0">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} AgroDrone. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

