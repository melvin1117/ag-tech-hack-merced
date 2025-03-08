import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, DrillIcon as Drone, MapPin, RefreshCw } from "lucide-react"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest drone and system activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
              <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Scan Completed</p>
              <p className="text-xs text-muted-foreground">North Field - 10:32 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
              <Drone className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Drone Deployed</p>
              <p className="text-xs text-muted-foreground">South Field - 9:15 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
              <MapPin className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">New Area Mapped</p>
              <p className="text-xs text-muted-foreground">West Field - Yesterday</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900">
              <RefreshCw className="h-3 w-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">System Updated</p>
              <p className="text-xs text-muted-foreground">All Drones - 2 days ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

