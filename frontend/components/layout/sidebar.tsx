import type React from "react"
import Link from "next/link"

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">AgroVision</h1>
      </div>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/drones" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Drones
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/fields" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Fields
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/analytics" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Analytics
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

