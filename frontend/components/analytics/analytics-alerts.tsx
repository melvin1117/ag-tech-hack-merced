import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Bell, BellOff } from "lucide-react"

interface Alert {
  id: string
  title: string
  description: string
  timestamp: string
  type: "critical" | "warning" | "info" | "success"
  field: string
  isRead: boolean
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Critical Soil Moisture Level",
    description: "North Field section A3 moisture level has dropped below 15%. Immediate irrigation recommended.",
    timestamp: "Today, 10:23 AM",
    type: "critical",
    field: "North Field",
    isRead: false,
  },
  {
    id: "2",
    title: "Potential Pest Detection",
    description:
      "Drone imagery detected potential pest activity in East Field soybeans. Ground inspection recommended.",
    timestamp: "Today, 9:45 AM",
    type: "warning",
    field: "East Field",
    isRead: false,
  },
  {
    id: "3",
    title: "Weather Alert",
    description: "Heavy rain forecast for tomorrow. Consider postponing scheduled fertilizer application.",
    timestamp: "Yesterday, 4:30 PM",
    type: "warning",
    field: "All Fields",
    isRead: true,
  },
  {
    id: "4",
    title: "Optimal Planting Window",
    description: "Soil conditions in West Field will be optimal for planting between May 15-20.",
    timestamp: "Yesterday, 2:15 PM",
    type: "info",
    field: "West Field",
    isRead: true,
  },
  {
    id: "5",
    title: "Drone Maintenance Completed",
    description: "Scheduled maintenance for Drone 4 has been completed. The drone is now ready for deployment.",
    timestamp: "2 days ago",
    type: "success",
    field: "Equipment",
    isRead: true,
  },
]

export function AnalyticsAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>Recent alerts from your farm monitoring systems</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Manage Alerts</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`flex gap-3 rounded-lg border p-3 ${!alert.isRead ? "bg-muted/50" : ""}`}>
              <div className="mt-0.5">
                {alert.type === "critical" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                {alert.type === "warning" && <AlertCircle className="h-5 w-5 text-amber-500" />}
                {alert.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
                {alert.type === "success" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{alert.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{alert.field}</Badge>
                    {!alert.isRead && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    {alert.isRead ? (
                      <BellOff className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Bell className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">{alert.isRead ? "Mark as unread" : "Mark as read"}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

