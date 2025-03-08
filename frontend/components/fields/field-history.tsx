import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Droplet, TreesIcon as Plant, Tractor } from "lucide-react"

export function FieldHistory({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Field History</CardTitle>
        <CardDescription>Recent activities and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-blue-900 p-1">
              <Droplet className="h-4 w-4 text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Irrigation Completed</p>
              <p className="text-xs text-muted-foreground">Today at 6:00 AM • 12,500 gallons</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-green-900 p-1">
              <Plant className="h-4 w-4 text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Drone Scan Completed</p>
              <p className="text-xs text-muted-foreground">Today at 10:32 AM • All sections</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-amber-900 p-1">
              <Tractor className="h-4 w-4 text-amber-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Fertilizer Applied</p>
              <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM • North section</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-purple-900 p-1">
              <Calendar className="h-4 w-4 text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Maintenance Scheduled</p>
              <p className="text-xs text-muted-foreground">Tomorrow at 9:00 AM • Irrigation system</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

