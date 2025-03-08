import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Bug, Sprout } from "lucide-react"

export function ActionItems() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
        <CardDescription>AI-suggested tasks based on drone data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <div className="rounded-full bg-blue-900 p-2">
              <Droplet className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium">Irrigate North Field Section A3</p>
              <p className="text-xs text-muted-foreground">
                Soil moisture is critically low (14%). Irrigate within 24 hours to prevent crop stress.
              </p>
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="default">
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <div className="rounded-full bg-amber-900 p-2">
              <Bug className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium">Inspect East Field for Pests</p>
              <p className="text-xs text-muted-foreground">
                Drone imagery shows signs of potential pest infestation in corn section. Verify and treat if necessary.
              </p>
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="default">
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <div className="rounded-full bg-green-900 p-2">
              <Sprout className="h-4 w-4 text-green-400" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium">Apply Fertilizer to South Field</p>
              <p className="text-xs text-muted-foreground">
                Soil analysis indicates nitrogen deficiency in wheat section. Apply supplemental fertilizer.
              </p>
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="default">
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

