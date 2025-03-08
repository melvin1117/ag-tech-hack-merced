import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, DropletIcon as DropletOff } from "lucide-react"

export function IrrigationStatus({ id }: { id: string }) {
  // In a real app, we would fetch irrigation data based on the ID
  const irrigationData = {
    status: id === "south-field" ? "Active" : "Inactive",
    lastIrrigation: id === "south-field" ? "Today at 6:00 AM" : "3 days ago",
    nextScheduled: id === "south-field" ? "Tomorrow at 6:00 AM" : "Not scheduled",
    coverage: id === "south-field" ? "65%" : "0%",
    waterUsed: id === "south-field" ? "12,500 gallons" : "0 gallons",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Irrigation Status</CardTitle>
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium">
            {irrigationData.status === "Active" ? (
              <>
                <Droplet className="h-3 w-3 text-blue-500" />
                <span>Active</span>
              </>
            ) : (
              <>
                <DropletOff className="h-3 w-3 text-muted-foreground" />
                <span>Inactive</span>
              </>
            )}
          </div>
        </div>
        <CardDescription>Current irrigation system status and schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Last Irrigation</div>
              <div className="font-medium">{irrigationData.lastIrrigation}</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-xs text-muted-foreground">Next Scheduled</div>
              <div className="font-medium">{irrigationData.nextScheduled}</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Coverage</span>
              <span>{irrigationData.coverage}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-blue-500" style={{ width: irrigationData.coverage }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Water Used (This Week)</span>
              <span>{irrigationData.waterUsed}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: irrigationData.status === "Active" ? "65%" : "0%" }}
              ></div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" disabled={irrigationData.status === "Active"}>
              Start Irrigation
            </Button>
            <Button className="flex-1" variant="outline" disabled={irrigationData.status !== "Active"}>
              Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

