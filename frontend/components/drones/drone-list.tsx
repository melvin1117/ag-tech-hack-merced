import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Battery, Signal } from "lucide-react"
import Link from "next/link"

export function DroneList() {
  const drones = [
    {
      id: "drone-1",
      name: "Drone #1",
      model: "AgriScan Pro X1",
      battery: "78%",
      status: "Flying",
      location: "North Field",
      signal: "Strong",
    },
    {
      id: "drone-2",
      name: "Drone #2",
      model: "AgriScan Pro X1",
      battery: "64%",
      status: "Scanning",
      location: "East Field",
      signal: "Good",
    },
    {
      id: "drone-3",
      name: "Drone #3",
      model: "AgriScan Lite S2",
      battery: "42%",
      status: "Charging",
      location: "Home Base",
      signal: "N/A",
    },
    {
      id: "drone-4",
      name: "Drone #4",
      model: "AgriScan Lite S2",
      battery: "100%",
      status: "Idle",
      location: "Home Base",
      signal: "N/A",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Drones</CardTitle>
        <CardDescription>Manage and monitor your drone fleet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {drones.map((drone) => (
            <div key={drone.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="grid gap-1">
                <div className="font-medium">{drone.name}</div>
                <div className="text-sm text-muted-foreground">{drone.model}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="hidden md:flex items-center gap-1">
                  <Battery className="h-4 w-4 text-muted-foreground" />
                  <span>{drone.battery}</span>
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <Signal className="h-4 w-4 text-muted-foreground" />
                  <span>{drone.signal}</span>
                </div>
                <div className="hidden md:block text-muted-foreground">{drone.location}</div>
                <Badge
                  variant={
                    drone.status === "Flying" || drone.status === "Scanning"
                      ? "default"
                      : drone.status === "Charging"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {drone.status}
                </Badge>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/drones/${drone.id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">View {drone.name}</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

