"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"

export function WeatherWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Weather</CardTitle>
        <CardDescription>Current and forecast conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center">
            <Sun className="h-10 w-10 text-yellow-500" />
            <Cloud className="h-8 w-8 text-gray-400 -ml-4" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">72°F</div>
            <div className="text-sm text-muted-foreground">Partly Cloudy</div>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full text-center text-xs">
            <div className="flex flex-col items-center">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>32%</span>
              <span className="text-muted-foreground">Humidity</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind className="h-4 w-4 text-blue-500" />
              <span>8 mph</span>
              <span className="text-muted-foreground">Wind</span>
            </div>
            <div className="flex flex-col items-center">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span>10%</span>
              <span className="text-muted-foreground">Rain</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

