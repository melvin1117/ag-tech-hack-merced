import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function PlantingRecommendations({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Planting Recommendations</CardTitle>
          <CardDescription>AI-generated suggestions based on soil and climate data</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border p-3">
            <div className="font-medium">Optimal Planting Zones</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Based on soil analysis, the northern and eastern sections of this field are most suitable for{" "}
              {id === "north-field" ? "corn" : id === "east-field" ? "soybeans" : "wheat"} planting. The southwestern
              corner shows higher clay content and may benefit from additional preparation.
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="font-medium">Recommended Planting Density</div>
            <div className="mt-2 text-sm text-muted-foreground">
              For optimal yield, plant at{" "}
              {id === "north-field"
                ? "32,000 seeds per acre"
                : id === "east-field"
                  ? "140,000 seeds per acre"
                  : "1.8 million seeds per acre"}{" "}
              in the primary zones, reducing by 10% in the southwestern section.
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="font-medium">Fertilizer Recommendations</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Apply nitrogen-rich fertilizer at 180 lbs/acre in the northern section, and phosphorus-rich fertilizer at
              100 lbs/acre in the southern section to address soil deficiencies.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

