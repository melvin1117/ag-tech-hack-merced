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
            <Link href="/reports" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Reports
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/crop-recommendations" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Crop Recommendations
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/bee-guide" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Bee Guide
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

