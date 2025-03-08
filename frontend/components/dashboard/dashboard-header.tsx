import { Leaf } from "lucide-react"

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-green-500" />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
    </div>
  )
}

export default DashboardHeader

