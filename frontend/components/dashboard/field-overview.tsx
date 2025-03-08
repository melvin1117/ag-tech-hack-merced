"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function FieldOverview() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Field Overview</CardTitle>
            <CardDescription>Current status of your fields</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Fields
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="moisture">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="moisture">Moisture</TabsTrigger>
            <TabsTrigger value="health">Crop Health</TabsTrigger>
            <TabsTrigger value="yield">Yield Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="moisture" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-green-400 to-yellow-500 opacity-70"></div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center mix-blend-overlay"></div>
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
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md border bg-blue-950 p-2">
                <div className="font-medium">North Field</div>
                <div className="text-muted-foreground">Moisture Level</div>
                <div className="mt-1 text-blue-400">28%</div>
              </div>
              <div className="rounded-md border bg-green-950 p-2">
                <div className="font-medium">East Field</div>
                <div className="text-muted-foreground">Moisture Level</div>
                <div className="mt-1 text-green-400">22%</div>
              </div>
              <div className="rounded-md border bg-yellow-950 p-2">
                <div className="font-medium">South Field</div>
                <div className="text-muted-foreground">Moisture Level</div>
                <div className="mt-1 text-yellow-400">14%</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="health" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-70"></div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center mix-blend-overlay"></div>
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
              <div className="rounded-md border bg-green-950 p-2">
                <div className="font-medium">North Field</div>
                <div className="text-muted-foreground">Corn Health</div>
                <div className="mt-1 text-green-400">Good (0.78)</div>
              </div>
              <div className="rounded-md border bg-yellow-950 p-2">
                <div className="font-medium">East Field</div>
                <div className="text-muted-foreground">Soybean Health</div>
                <div className="mt-1 text-yellow-400">Fair (0.62)</div>
              </div>
              <div className="rounded-md border bg-green-950 p-2">
                <div className="font-medium">South Field</div>
                <div className="text-muted-foreground">Wheat Health</div>
                <div className="mt-1 text-green-400">Good (0.75)</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="yield" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="rounded-md bg-black/90 p-2 text-center">
                    <div className="text-lg font-bold text-green-400">+12%</div>
                    <div className="text-xs">North Field</div>
                  </div>
                  <div className="rounded-md bg-black/90 p-2 text-center">
                    <div className="text-lg font-bold text-yellow-400">-3%</div>
                    <div className="text-xs">East Field</div>
                  </div>
                  <div className="rounded-md bg-black/90 p-2 text-center">
                    <div className="text-lg font-bold text-green-400">+8%</div>
                    <div className="text-xs">South Field</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md border p-2">
                <div className="font-medium">North Field</div>
                <div className="text-muted-foreground">Corn Yield</div>
                <div className="mt-1 text-lg">168 bu/ac</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">East Field</div>
                <div className="text-muted-foreground">Soybean Yield</div>
                <div className="mt-1 text-lg">42 bu/ac</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">South Field</div>
                <div className="text-muted-foreground">Wheat Yield</div>
                <div className="mt-1 text-lg">58 bu/ac</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

