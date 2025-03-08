"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

// Sample data for drone activity
const droneActivityData = [
  { date: "Jan 1", flightHours: 2.5, areaScanned: 45, batteryEfficiency: 90 },
  { date: "Jan 8", flightHours: 3.2, areaScanned: 58, batteryEfficiency: 92 },
  { date: "Jan 15", flightHours: 4.0, areaScanned: 72, batteryEfficiency: 91 },
  { date: "Jan 22", flightHours: 3.5, areaScanned: 63, batteryEfficiency: 89 },
  { date: "Jan 29", flightHours: 2.8, areaScanned: 50, batteryEfficiency: 88 },
  { date: "Feb 5", flightHours: 3.0, areaScanned: 54, batteryEfficiency: 90 },
  { date: "Feb 12", flightHours: 3.8, areaScanned: 68, batteryEfficiency: 93 },
  { date: "Feb 19", flightHours: 4.2, areaScanned: 75, batteryEfficiency: 94 },
  { date: "Feb 26", flightHours: 3.7, areaScanned: 66, batteryEfficiency: 92 },
  { date: "Mar 5", flightHours: 3.3, areaScanned: 60, batteryEfficiency: 91 },
  { date: "Mar 12", flightHours: 4.5, areaScanned: 80, batteryEfficiency: 95 },
  { date: "Mar 19", flightHours: 5.0, areaScanned: 87, batteryEfficiency: 96 },
]

export function DroneActivityChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Drone Activity</CardTitle>
          <CardDescription>Flight hours and area scanned over time</CardDescription>
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
            flightHours: {
              label: "Flight Hours",
              color: "hsl(var(--chart-1))",
            },
            areaScanned: {
              label: "Area Scanned (acres)",
              color: "hsl(var(--chart-2))",
            },
            batteryEfficiency: {
              label: "Battery Efficiency (%)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={droneActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="flightHours"
                stroke="var(--color-flightHours)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="areaScanned"
                stroke="var(--color-areaScanned)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="batteryEfficiency"
                stroke="var(--color-batteryEfficiency)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
          <div className="rounded-md border p-2">
            <div className="font-medium">Total Flight Hours</div>
            <div className="mt-1 text-lg">43.5 hours</div>
            <div className="text-green-600 dark:text-green-400">+12.5 from previous period</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="font-medium">Total Area Scanned</div>
            <div className="mt-1 text-lg">778 acres</div>
            <div className="text-green-600 dark:text-green-400">+215 from previous period</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="font-medium">Avg Battery Efficiency</div>
            <div className="mt-1 text-lg">92%</div>
            <div className="text-green-600 dark:text-green-400">+3% from previous period</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

