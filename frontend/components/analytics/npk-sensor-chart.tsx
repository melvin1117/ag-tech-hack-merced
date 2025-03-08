"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info, AlertTriangle } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"

// Sample data for NPK levels across fields
const npkData = [
  {
    field: "North Field",
    nitrogen: 65,
    phosphorus: 45,
    potassium: 80,
    status: "Balanced",
    recommendation: "Maintain current fertilization program",
  },
  {
    field: "East Field",
    nitrogen: 40,
    phosphorus: 75,
    potassium: 35,
    status: "Imbalanced",
    recommendation: "Apply potassium-rich fertilizer (50 lbs/acre)",
  },
  {
    field: "South Field",
    nitrogen: 30,
    phosphorus: 50,
    potassium: 60,
    status: "Nitrogen Deficient",
    recommendation: "Apply nitrogen-rich fertilizer (75 lbs/acre)",
  },
  {
    field: "West Field",
    nitrogen: 55,
    phosphorus: 60,
    potassium: 65,
    status: "Balanced",
    recommendation: "No action needed (fallow field)",
  },
]

// Define optimal ranges for reference
const optimalRanges = {
  nitrogen: { min: 50, max: 80 },
  phosphorus: { min: 40, max: 70 },
  potassium: { min: 60, max: 90 },
}

export function NPKSensorChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Soil Nutrient Levels (NPK)</CardTitle>
          <CardDescription>Nitrogen, Phosphorus, and Potassium readings from soil sensors</CardDescription>
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
              label: "Nitrogen (N)",
              color: "hsl(var(--chart-1))",
            },
            phosphorus: {
              label: "Phosphorus (P)",
              color: "hsl(var(--chart-2))",
            },
            potassium: {
              label: "Potassium (K)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={npkData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barGap={5} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" />
              <YAxis domain={[0, 100]} label={{ value: "Nutrient Level (%)", angle: -90, position: "insideLeft" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="nitrogen" fill="var(--color-nitrogen)" name="Nitrogen (N)">
                {npkData.map((entry, index) => (
                  <Cell
                    key={`nitrogen-${index}`}
                    fill={entry.nitrogen < optimalRanges.nitrogen.min ? "#ef4444" : "var(--color-nitrogen)"}
                  />
                ))}
              </Bar>
              <Bar dataKey="phosphorus" fill="var(--color-phosphorus)" name="Phosphorus (P)">
                {npkData.map((entry, index) => (
                  <Cell
                    key={`phosphorus-${index}`}
                    fill={entry.phosphorus > optimalRanges.phosphorus.max ? "#f59e0b" : "var(--color-phosphorus)"}
                  />
                ))}
              </Bar>
              <Bar dataKey="potassium" fill="var(--color-potassium)" name="Potassium (K)">
                {npkData.map((entry, index) => (
                  <Cell
                    key={`potassium-${index}`}
                    fill={entry.potassium < optimalRanges.potassium.min ? "#ef4444" : "var(--color-potassium)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Optimal Range: N (50-80%), P (40-70%), K (60-90%)</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">East Field Alert</div>
                <Badge variant="destructive">Action Needed</Badge>
              </div>
              <div className="mt-2 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">Low Potassium Detected</p>
                  <p className="text-muted-foreground mt-1">
                    Potassium levels are 35% (below optimal 60-90% range). This may limit soybean growth and reduce
                    disease resistance.
                  </p>
                  <p className="font-medium mt-2">Recommendation:</p>
                  <p className="text-muted-foreground">
                    Apply potassium-rich fertilizer at 50 lbs/acre within the next 7 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">South Field Alert</div>
                <Badge variant="destructive">Action Needed</Badge>
              </div>
              <div className="mt-2 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">Low Nitrogen Detected</p>
                  <p className="text-muted-foreground mt-1">
                    Nitrogen levels are 30% (below optimal 50-80% range). This will significantly impact wheat growth
                    and yield potential.
                  </p>
                  <p className="font-medium mt-2">Recommendation:</p>
                  <p className="text-muted-foreground">Apply nitrogen-rich fertilizer at 75 lbs/acre immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

