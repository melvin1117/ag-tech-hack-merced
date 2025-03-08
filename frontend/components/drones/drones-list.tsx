import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Battery, Wifi, MapPin, AlertCircle } from "lucide-react"

export function DronesList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Drone Fleet</h2>
        <Button>Add Drone</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drones.map((drone) => (
          <Card key={drone.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{drone.name}</CardTitle>
                <StatusBadge status={drone.status} />
              </div>
              <CardDescription>{drone.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Battery className="h-4 w-4" />
                    <span className="text-sm">Battery</span>
                  </div>
                  <span className="text-sm font-medium">{drone.battery}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      drone.battery > 50 ? "bg-green-500" : drone.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${drone.battery}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>Signal</span>
                  </div>
                  <span>{drone.signal}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Last Mission</span>
                  </div>
                  <span>{drone.lastMission}</span>
                </div>

                {drone.alert && (
                  <div className="flex items-center gap-2 p-2 bg-red-500/10 text-red-500 rounded-md mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{drone.alert}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  <Button size="sm">Deploy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: "active" | "idle" | "charging" | "maintenance" }) {
  const variants = {
    active: "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600",
    idle: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-600",
    charging: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-600",
    maintenance: "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600",
  }

  const labels = {
    active: "Active",
    idle: "Idle",
    charging: "Charging",
    maintenance: "Maintenance",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {labels[status]}
    </Badge>
  )
}

const drones = [
  {
    id: 1,
    name: "Drone 1",
    location: "North Field - Corn",
    status: "active" as const,
    battery: 78,
    signal: "Strong",
    lastMission: "Today, 10:30 AM",
  },
  {
    id: 2,
    name: "Drone 2",
    location: "East Field - Soybeans",
    status: "idle" as const,
    battery: 92,
    signal: "Strong",
    lastMission: "Yesterday, 4:15 PM",
  },
  {
    id: 3,
    name: "Drone 3",
    location: "South Field - Wheat",
    status: "charging" as const,
    battery: 23,
    signal: "N/A",
    lastMission: "Yesterday, 2:45 PM",
  },
  {
    id: 4,
    name: "Drone 4",
    location: "West Field",
    status: "maintenance" as const,
    battery: 45,
    signal: "Weak",
    lastMission: "3 days ago",
    alert: "Camera malfunction detected",
  },
  {
    id: 5,
    name: "Drone 5",
    location: "Storage",
    status: "idle" as const,
    battery: 100,
    signal: "Strong",
    lastMission: "1 week ago",
  },
]

