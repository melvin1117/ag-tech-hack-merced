"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CropHealthChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Crop Health</CardTitle>
          <CardDescription>NDVI and health indicators</CardDescription>
        </div>
        <Select defaultValue="corn">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="corn">Corn</SelectItem>
            <SelectItem value="soybeans">Soybeans</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-70"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center mix-blend-overlay"></div>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md bg-background/80 p-2 text-xs backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>Poor</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span>Fair</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Good</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md border p-2">
            <div className="font-medium">NDVI</div>
            <div className="mt-1 text-lg">0.72</div>
            <div className="text-xs text-green-600 dark:text-green-400">Good</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="font-medium">Stress</div>
            <div className="mt-1 text-lg">12%</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Low</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="font-medium">Chlorophyll</div>
            <div className="mt-1 text-lg">38</div>
            <div className="text-xs text-green-600 dark:text-green-400">Normal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

