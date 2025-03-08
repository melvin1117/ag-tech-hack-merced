import Link from "next/link"
import { Leaf } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { NotificationBell } from "@/components/notification-bell"
import { useAuth0 } from "@auth0/auth0-react"

interface PageHeaderProps {
  title?: string
}

export function PageHeader({ title = "AgroVision" }: PageHeaderProps) {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="hidden font-bold sm:inline-block">{title}</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated && <NotificationBell />}
          <UserNav />
        </div>
      </div>
    </header>
  )
}

