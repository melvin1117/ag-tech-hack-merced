"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DroneTelemetry() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Drone Telemetry</CardTitle>
          <CardDescription>Real-time drone performance data</CardDescription>
        </div>
        <Select defaultValue="drone1">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select drone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="drone1">Drone #1</SelectItem>
            <SelectItem value="drone2">Drone #2</SelectItem>
            <SelectItem value="drone3">Drone #3</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="battery">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="battery">Battery</TabsTrigger>
            <TabsTrigger value="altitude">Altitude</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
          </TabsList>
          <TabsContent value="battery" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">78%</div>
                <div className="text-sm text-muted-foreground">Estimated 42 min remaining</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md border p-2">
                <div className="font-medium">Voltage</div>
                <div className="mt-1 text-lg">14.8V</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Current</div>
                <div className="mt-1 text-lg">12.3A</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Temperature</div>
                <div className="mt-1 text-lg">32°C</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="altitude" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">120 ft</div>
                <div className="text-sm text-muted-foreground">Optimal scanning height</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md border p-2">
                <div className="font-medium">Min Height</div>
                <div className="mt-1 text-lg">80 ft</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Max Height</div>
                <div className="mt-1 text-lg">150 ft</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Terrain</div>
                <div className="mt-1 text-lg">+12 ft</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="speed" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">18 mph</div>
                <div className="text-sm text-muted-foreground">Cruising speed</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md border p-2">
                <div className="font-medium">Heading</div>
                <div className="mt-1 text-lg">245°</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Wind</div>
                <div className="mt-1 text-lg">8 mph</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Distance</div>
                <div className="mt-1 text-lg">1.2 mi</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

