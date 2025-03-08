import Link from "next/link"
import { Plus, Circle } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/dashboard" className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center">
        {/* Center circle */}
        <Circle className="h-4 w-4 absolute text-primary" fill="currentColor" />

        {/* Drone arms using rotated plus signs */}
        <Plus className="h-10 w-10 absolute text-primary transform rotate-45" strokeWidth={2.5} />

        {/* Propeller indicators */}
        <div className="absolute top-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-primary" />
        <div className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-primary" />
        <div className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-primary" />
        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-primary" />
      </div>
      <span className="font-bold text-xl">AgroDrone</span>
    </Link>
  )
}

