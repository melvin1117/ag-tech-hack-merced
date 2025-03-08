"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Bar, ComposedChart } from "recharts"

// Sample data for weather
const weatherData = [
  { date: "Jan 1", temperature: 32, precipitation: 0.0, humidity: 65 },
  { date: "Jan 8", temperature: 35, precipitation: 0.2, humidity: 70 },
  { date: "Jan 15", temperature: 38, precipitation: 0.5, humidity: 75 },
  { date: "Jan 22", temperature: 40, precipitation: 0.3, humidity: 72 },
  { date: "Jan 29", temperature: 42, precipitation: 0.1, humidity: 68 },
  { date: "Feb 5", temperature: 45, precipitation: 0.0, humidity: 65 },
  { date: "Feb 12", temperature: 48, precipitation: 0.4, humidity: 70 },
  { date: "Feb 19", temperature: 52, precipitation: 0.6, humidity: 75 },
  { date: "Feb 26", temperature: 55, precipitation: 0.8, humidity: 80 },
  { date: "Mar 5", temperature: 58, precipitation: 1.2, humidity: 85 },
  { date: "Mar 12", temperature: 62, precipitation: 1.5, humidity: 80 },
  { date: "Mar 19", temperature: 65, precipitation: 1.8, humidity: 75 },
]

export function WeatherDataChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Weather Data</CardTitle>
          <CardDescription>Temperature, precipitation, and humidity over time</CardDescription>
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
            temperature: {
              label: "Temperature (°F)",
              color: "hsl(var(--chart-1))",
            },
            precipitation: {
              label: "Precipitation (in)",
              color: "hsl(var(--chart-2))",
            },
            humidity: {
              label: "Humidity (%)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={weatherData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-temperature)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Bar yAxisId="left" dataKey="precipitation" fill="var(--color-precipitation)" barSize={20} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="humidity"
                stroke="var(--color-humidity)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-md border p-3">
            <div className="text-sm font-medium">Weather Trends</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Temperature has been steadily increasing from 32°F to 65°F over the period. Precipitation has also
              increased, with the highest rainfall recorded in the most recent weeks. These conditions are favorable for
              crop growth in the coming weeks.
            </div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-sm font-medium">Weather Alert</div>
            <div className="mt-1 text-red-500 font-medium">Heavy Rain Expected</div>
            <div className="text-xs text-muted-foreground">
              Weather forecast indicates 1.5-2.0 inches of rainfall in the next 48 hours. Consider postponing scheduled
              fertilizer application to avoid runoff and nutrient loss.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

