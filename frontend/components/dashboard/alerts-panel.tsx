import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Bug, Thermometer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Alerts</CardTitle>
          <Badge>3 New</Badge>
        </div>
        <CardDescription>Issues requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-red-900 p-1">
              <Droplet className="h-4 w-4 text-red-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Low Soil Moisture</p>
              <p className="text-xs text-muted-foreground">North Field - Section A3</p>
              <Badge variant="outline" className="mt-1 text-xs">
                High Priority
              </Badge>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-amber-900 p-1">
              <Bug className="h-4 w-4 text-amber-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Pest Detection</p>
              <p className="text-xs text-muted-foreground">East Field - Corn Section</p>
              <Badge variant="outline" className="mt-1 text-xs">
                Medium Priority
              </Badge>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-yellow-900 p-1">
              <Thermometer className="h-4 w-4 text-yellow-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Temperature Stress</p>
              <p className="text-xs text-muted-foreground">South Field - Soybean Section</p>
              <Badge variant="outline" className="mt-1 text-xs">
                Medium Priority
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

