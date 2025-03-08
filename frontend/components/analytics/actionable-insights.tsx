import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, Lightbulb, Tractor, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ActionableInsights() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Actionable Insights</CardTitle>
          <CardDescription>What your drone and sensor data means for your farm</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All Insights
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Critical: North Field Irrigation Needed</h3>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Soil moisture in North Field section A3 has dropped to 14%, well below the optimal range of 25-30%.
                Drone thermal imagery shows signs of crop stress beginning to appear.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Action needed within: <span className="font-medium text-foreground">24 hours</span>
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium">Recommended Action:</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Irrigate North Field section A3 with 1.5 inches of water. This will restore soil moisture to optimal
                  levels and prevent yield loss.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Schedule Irrigation</Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
              <Tractor className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">East Field Nutrient Imbalance</h3>
                <Badge>Important</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Soil sensors show low potassium (35%) in East Field, while drone imagery reveals yellowing leaf edges in
                soybean plants - a classic sign of potassium deficiency.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Action needed within: <span className="font-medium text-foreground">7 days</span>
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium">Recommended Action:</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Apply potassium-rich fertilizer at 50 lbs/acre to East Field. This will correct the deficiency and
                  improve plant vigor and disease resistance.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Schedule Application</Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Optimization: Variable Rate Application</h3>
                <Badge variant="outline">Efficiency</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Combined drone NDVI maps and soil sensor data show variable nitrogen needs across South Field. Using
                variable rate application could save 15% on fertilizer costs.
              </p>
              <div className="mt-3">
                <h4 className="text-sm font-medium">Recommended Action:</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use the generated variable rate application map to apply nitrogen fertilizer at rates from 50-100
                  lbs/acre based on specific zones in South Field.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">View Application Map</Button>
                  <Button variant="outline" size="sm">
                    Calculate Savings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

