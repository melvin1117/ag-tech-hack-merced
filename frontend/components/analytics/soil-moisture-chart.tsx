"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"

// Sample data for soil moisture over time
const soilMoistureData = [
  { date: "Jan 1", northField: 28, eastField: 22, southField: 14, westField: 18 },
  { date: "Jan 8", northField: 30, eastField: 24, southField: 16, westField: 20 },
  { date: "Jan 15", northField: 32, eastField: 26, southField: 18, westField: 22 },
  { date: "Jan 22", northField: 30, eastField: 25, southField: 17, westField: 21 },
  { date: "Jan 29", northField: 28, eastField: 23, southField: 15, westField: 19 },
  { date: "Feb 5", northField: 26, eastField: 21, southField: 13, westField: 17 },
  { date: "Feb 12", northField: 24, eastField: 19, southField: 11, westField: 15 },
  { date: "Feb 19", northField: 22, eastField: 17, southField: 9, westField: 13 },
  { date: "Feb 26", northField: 20, eastField: 15, southField: 7, westField: 11 },
  { date: "Mar 5", northField: 18, eastField: 13, southField: 5, westField: 9 },
  { date: "Mar 12", northField: 16, eastField: 11, southField: 3, westField: 7 },
  { date: "Mar 19", northField: 14, eastField: 9, southField: 1, westField: 5 },
]

export function SoilMoistureChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Soil Moisture Trends</CardTitle>
          <CardDescription>Moisture percentage by field over time</CardDescription>
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
            <AreaChart data={soilMoistureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorNorthField" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-northField)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-northField)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorEastField" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-eastField)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-eastField)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorSouthField" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-southField)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-southField)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorWestField" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-westField)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-westField)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 40]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="northField"
                stroke="var(--color-northField)"
                fillOpacity={1}
                fill="url(#colorNorthField)"
              />
              <Area
                type="monotone"
                dataKey="eastField"
                stroke="var(--color-eastField)"
                fillOpacity={1}
                fill="url(#colorEastField)"
              />
              <Area
                type="monotone"
                dataKey="southField"
                stroke="var(--color-southField)"
                fillOpacity={1}
                fill="url(#colorSouthField)"
              />
              <Area
                type="monotone"
                dataKey="westField"
                stroke="var(--color-westField)"
                fillOpacity={1}
                fill="url(#colorWestField)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-md border p-3">
            <div className="text-sm font-medium">Critical Alert</div>
            <div className="mt-1 text-red-500 font-medium">South Field Moisture Critical</div>
            <div className="text-xs text-muted-foreground">
              Moisture levels have dropped to 1% in South Field, significantly below the optimal range of 20-25%.
            </div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-sm font-medium">Irrigation Impact</div>
            <div className="mt-1 text-green-500 font-medium">North Field Recovery</div>
            <div className="text-xs text-muted-foreground">
              Irrigation on Jan 8 successfully increased moisture levels from 28% to 32% in North Field.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

