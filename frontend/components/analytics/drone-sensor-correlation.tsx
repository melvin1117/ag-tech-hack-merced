"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info, Lightbulb } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, ZAxis } from "recharts"

// Sample data correlating NDVI (from drone) with NPK levels (from sensors)
const correlationData = [
  // North Field data points
  { field: "North Field", ndvi: 0.78, nitrogen: 65, phosphorus: 45, potassium: 80, z: 120 },
  { field: "North Field", ndvi: 0.82, nitrogen: 70, phosphorus: 50, potassium: 85, z: 120 },
  { field: "North Field", ndvi: 0.75, nitrogen: 60, phosphorus: 40, potassium: 75, z: 120 },
  { field: "North Field", ndvi: 0.8, nitrogen: 68, phosphorus: 48, potassium: 82, z: 120 },

  // East Field data points
  { field: "East Field", ndvi: 0.62, nitrogen: 40, phosphorus: 75, potassium: 35, z: 80 },
  { field: "East Field", ndvi: 0.58, nitrogen: 35, phosphorus: 70, potassium: 30, z: 80 },
  { field: "East Field", ndvi: 0.65, nitrogen: 45, phosphorus: 80, potassium: 40, z: 80 },
  { field: "East Field", ndvi: 0.6, nitrogen: 38, phosphorus: 72, potassium: 32, z: 80 },

  // South Field data points
  { field: "South Field", ndvi: 0.7, nitrogen: 30, phosphorus: 50, potassium: 60, z: 100 },
  { field: "South Field", ndvi: 0.72, nitrogen: 32, phosphorus: 55, potassium: 65, z: 100 },
  { field: "South Field", ndvi: 0.68, nitrogen: 28, phosphorus: 45, potassium: 55, z: 100 },
  { field: "South Field", ndvi: 0.75, nitrogen: 35, phosphorus: 52, potassium: 62, z: 100 },
]

export function DroneSensorCorrelation() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Drone & Sensor Correlation</CardTitle>
          <CardDescription>Relationship between drone imagery (NDVI) and soil nutrient levels</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            nitrogen: {
              label: "Nitrogen Correlation",
              color: "hsl(var(--chart-1))",
            },
            phosphorus: {
              label: "Phosphorus Correlation",
              color: "hsl(var(--chart-2))",
            },
            potassium: {
              label: "Potassium Correlation",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="ndvi"
                name="NDVI"
                domain={[0.5, 1]}
                label={{ value: "NDVI (Drone Imagery)", position: "bottom" }}
              />
              <YAxis
                type="number"
                dataKey="nitrogen"
                name="Nitrogen"
                label={{ value: "Nutrient Level (%)", angle: -90, position: "insideLeft" }}
              />
              <ZAxis type="number" dataKey="z" range={[60, 200]} name="Field Size" />
              <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
              <Legend />
              <Scatter
                name="North Field"
                data={correlationData.filter((d) => d.field === "North Field")}
                fill="#22c55e"
              />
              <Scatter
                name="East Field"
                data={correlationData.filter((d) => d.field === "East Field")}
                fill="#3b82f6"
              />
              <Scatter
                name="South Field"
                data={correlationData.filter((d) => d.field === "South Field")}
                fill="#f59e0b"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 space-y-3">
          <div className="rounded-md border p-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <div className="text-sm font-medium">What This Means</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <p>
                This chart shows the relationship between crop health (NDVI from drone imagery) and soil nutrient levels
                (from soil sensors). The strong positive correlation between NDVI and nitrogen levels indicates that
                nitrogen is currently the most limiting nutrient for crop growth across your fields.
              </p>
              <p className="mt-2">Key insights:</p>
              <ul className="mt-1 list-disc pl-4 space-y-1">
                <li>
                  <span className="font-medium">North Field:</span> High NDVI values correlate with adequate nitrogen
                  levels, explaining the excellent corn growth.
                </li>
                <li>
                  <span className="font-medium">East Field:</span> Lower NDVI values correlate with potassium
                  deficiency, suggesting this is limiting soybean growth.
                </li>
                <li>
                  <span className="font-medium">South Field:</span> Despite adequate potassium, the low nitrogen is
                  limiting wheat growth potential.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

