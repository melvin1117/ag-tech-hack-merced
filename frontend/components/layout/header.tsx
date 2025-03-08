import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-green-600 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          AgroVision
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

