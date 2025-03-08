"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"

// Sample data for field comparison
const fieldComparisonData = [
  { metric: "Soil Quality", northField: 85, eastField: 70, southField: 90, westField: 60 },
  { metric: "Moisture", northField: 80, eastField: 65, southField: 40, westField: 55 },
  { metric: "Crop Health", northField: 92, eastField: 68, southField: 95, westField: 0 },
  { metric: "Pest Resistance", northField: 75, eastField: 60, southField: 85, westField: 70 },
  { metric: "Nutrient Levels", northField: 88, eastField: 72, southField: 80, westField: 65 },
  { metric: "Yield Potential", northField: 90, eastField: 65, southField: 85, westField: 0 },
]

export function FieldComparisonChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Field Comparison</CardTitle>
          <CardDescription>Radar chart comparing key metrics across fields</CardDescription>
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
            northField: {
              label: "North Field",
              color: "hsl(var(--chart-1))",
            },
            eastField: {
              label: "East Field",
              color: "hsl(var(--chart-2))",
            },
            southField: {
              label: "South Field",
              color: "hsl(var(--chart-3))",
            },
            westField: {
              label: "West Field",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={fieldComparisonData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Radar
                name="North Field"
                dataKey="northField"
                stroke="var(--color-northField)"
                fill="var(--color-northField)"
                fillOpacity={0.2}
              />
              <Radar
                name="East Field"
                dataKey="eastField"
                stroke="var(--color-eastField)"
                fill="var(--color-eastField)"
                fillOpacity={0.2}
              />
              <Radar
                name="South Field"
                dataKey="southField"
                stroke="var(--color-southField)"
                fill="var(--color-southField)"
                fillOpacity={0.2}
              />
              <Radar
                name="West Field"
                dataKey="westField"
                stroke="var(--color-westField)"
                fill="var(--color-westField)"
                fillOpacity={0.2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            This radar chart provides a comprehensive comparison of all fields across key metrics. South Field shows the
            best overall performance, particularly in crop health and soil quality. North Field follows closely with
            balanced metrics. East Field shows moderate performance across all metrics, while West Field (currently
            fallow) shows no crop health or yield potential.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

