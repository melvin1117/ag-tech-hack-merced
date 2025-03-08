import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function KeyMetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Key Insight</CardTitle>
          <Badge variant="destructive">Critical</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">North Field Moisture Critical</div>
          <p className="text-xs text-muted-foreground mt-1">
            Soil moisture in North Field section A3 has dropped to 14%, requiring immediate irrigation.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Key Insight</CardTitle>
          <Badge>Important</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">East Field Disease Detected</div>
          <p className="text-xs text-muted-foreground mt-1">
            Soybean rust detected in East Field affecting 22% of crops. Treatment recommended within 48 hours.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Key Insight</CardTitle>
          <Badge variant="outline">Info</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">Optimal Planting Window</div>
          <p className="text-xs text-muted-foreground mt-1">
            West Field optimal planting window identified between May 15-20 based on soil and weather conditions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Key Insight</CardTitle>
          <Badge variant="secondary">Weather</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">Heavy Rain Expected</div>
          <p className="text-xs text-muted-foreground mt-1">
            Weather forecast indicates 1.5-2.0 inches of rainfall in the next 48 hours. Consider postponing fertilizer
            application.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

