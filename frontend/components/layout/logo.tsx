import Link from "next/link"
import { Leaf } from "lucide-react"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-green-500" />
      <span className="text-xl font-bold">AgroVision</span>
    </Link>
  )
}

export default Logo

