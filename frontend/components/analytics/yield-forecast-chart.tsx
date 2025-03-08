"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell } from "recharts"

// Sample data for  XAxis, YAxis, ResponsiveContainer, Legend, Cell } from "recharts"

// Sample data for yield forecasts
const yieldForecastData = [
  { field: "North Field", currentYield: 168, previousYield: 150, change: 12 },
  { field: "East Field", currentYield: 42, previousYield: 43, change: -3 },
  { field: "South Field", currentYield: 58, previousYield: 54, change: 8 },
  { field: "West Field", currentYield: 0, previousYield: 0, change: 0 },
]

export function YieldForecastChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Yield Forecast</CardTitle>
          <CardDescription>Projected yields compared to previous season</CardDescription>
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
            currentYield: {
              label: "Current Season (bu/acre)",
              color: "hsl(var(--chart-1))",
            },
            previousYield: {
              label: "Previous Season (bu/acre)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yieldForecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="previousYield" fill="var(--color-previousYield)" name="Previous Season" />
              <Bar dataKey="currentYield" fill="var(--color-currentYield)" name="Current Season">
                {yieldForecastData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.change > 0 ? "var(--color-currentYield)" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
          <div className="rounded-md border p-2">
            <div className="font-medium">North Field (Corn)</div>
            <div className="mt-1 text-lg">168 bu/acre</div>
            <div className="text-green-600 dark:text-green-400">+12% from last season</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="font-medium">East Field (Soybeans)</div>
            <div className="mt-1 text-lg">42 bu/acre</div>
            <div className="text-red-600 dark:text-red-400">-3% from last season</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="font-medium">South Field (Wheat)</div>
            <div className="mt-1 text-lg">58 bu/acre</div>
            <div className="text-green-600 dark:text-green-400">+8% from last season</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

