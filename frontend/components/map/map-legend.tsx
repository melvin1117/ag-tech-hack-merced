import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MapLegend() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Legend</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="space-y-2">
          <div className="text-sm font-medium">Soil Moisture</div>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500"></div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Dry</span>
            <span>Optimal</span>
            <span>Wet</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Crop Health (NDVI)</div>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Planting Zones</div>
          <div className="grid grid-cols-3 gap-1">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Zone A</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Zone B</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Zone C</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

