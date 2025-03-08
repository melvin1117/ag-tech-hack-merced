import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Battery, Download, Signal } from "lucide-react"
import Link from "next/link"

export function DroneHeader({ id }: { id: string }) {
  // In a real app, we would fetch drone data based on the ID
  const droneData = {
    name: id === "drone-1" ? "Drone #1" : id === "drone-2" ? "Drone #2" : id === "drone-3" ? "Drone #3" : "Drone #4",
    model: id === "drone-1" || id === "drone-2" ? "AgriScan Pro X1" : "AgriScan Lite S2",
    battery: id === "drone-1" ? "78%" : id === "drone-2" ? "64%" : id === "drone-3" ? "42%" : "100%",
    status: id === "drone-1" ? "Flying" : id === "drone-2" ? "Scanning" : id === "drone-3" ? "Charging" : "Idle",
    location: id === "drone-1" ? "North Field" : id === "drone-2" ? "East Field" : "Home Base",
    signal: id === "drone-1" ? "Strong" : id === "drone-2" ? "Good" : "N/A",
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/drones">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Drones</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{droneData.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div>{droneData.model}</div>
            <div className="flex items-center gap-1">
              <Battery className="h-4 w-4" />
              <span>{droneData.battery}</span>
            </div>
            {droneData.signal !== "N/A" && (
              <div className="flex items-center gap-1">
                <Signal className="h-4 w-4" />
                <span>{droneData.signal}</span>
              </div>
            )}
            <Badge
              variant={
                droneData.status === "Flying" || droneData.status === "Scanning"
                  ? "default"
                  : droneData.status === "Charging"
                    ? "outline"
                    : "secondary"
              }
            >
              {droneData.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button>Control Drone</Button>
      </div>
    </div>
  )
}

