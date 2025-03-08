"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SoilMoistureMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Moisture Map</CardTitle>
        <CardDescription>Visualize soil moisture levels across your farm</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="heatmap">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="zones">Zones</TabsTrigger>
          </TabsList>
          <TabsContent value="heatmap" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-400 to-yellow-500 opacity-70"></div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md bg-background/80 p-2 text-xs backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Wet</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Optimal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span>Dry</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Last updated: Today at 8:45 AM • Tap on map for detailed readings
            </div>
          </TabsContent>
          <TabsContent value="zones" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L40,0 L40,60 L0,60 Z" fill="#3b82f6" fillOpacity="0.7" />
                  <path d="M40,0 L100,0 L100,60 L40,60 Z" fill="#22c55e" fillOpacity="0.7" />
                  <path d="M0,60 L100,60 L100,100 L0,100 Z" fill="#eab308" fillOpacity="0.7" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md bg-background/80 p-2 text-xs backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Zone A</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Zone B</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span>Zone C</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md border bg-blue-50 p-2 dark:bg-blue-950">
                <div className="font-medium">Zone A</div>
                <div className="text-muted-foreground">High Moisture</div>
                <div className="mt-1 text-blue-600 dark:text-blue-400">35-40%</div>
              </div>
              <div className="rounded-md border bg-green-50 p-2 dark:bg-green-950">
                <div className="font-medium">Zone B</div>
                <div className="text-muted-foreground">Optimal</div>
                <div className="mt-1 text-green-600 dark:text-green-400">25-30%</div>
              </div>
              <div className="rounded-md border bg-yellow-50 p-2 dark:bg-yellow-950">
                <div className="font-medium">Zone C</div>
                <div className="text-muted-foreground">Low Moisture</div>
                <div className="mt-1 text-yellow-600 dark:text-yellow-400">10-15%</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

