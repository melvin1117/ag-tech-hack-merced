"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Leaf, Maximize2 } from "lucide-react"

export function PlantingRecommendations() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Planting Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions based on soil and climate data</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="optimal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="optimal">Optimal Crops</TabsTrigger>
            <TabsTrigger value="schedule">Planting Schedule</TabsTrigger>
            <TabsTrigger value="zones">Planting Zones</TabsTrigger>
          </TabsList>
          <TabsContent value="optimal" className="pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900">
                      <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">Corn</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Suitability</span>
                      <span className="font-medium text-green-600 dark:text-green-400">High</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Recommended for Zone A and B (75 acres)</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900">
                      <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">Soybeans</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Suitability</span>
                      <span className="font-medium text-green-600 dark:text-green-400">Medium</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[65%] rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Recommended for Zone B (40 acres)</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900">
                      <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">Wheat</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Suitability</span>
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">Low</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[35%] rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Only suitable for Zone C (20 acres)</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="schedule" className="pt-4">
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 border-b text-center text-xs font-medium">
                  <div className="border-r p-2">Crop</div>
                  <div className="border-r p-2">Jan-Feb</div>
                  <div className="border-r p-2">Mar-Apr</div>
                  <div className="border-r p-2">May-Jun</div>
                  <div className="border-r p-2">Jul-Aug</div>
                  <div className="border-r p-2">Sep-Oct</div>
                  <div className="p-2">Nov-Dec</div>
                </div>
                <div className="grid grid-cols-7 text-center text-xs">
                  <div className="border-r p-2 font-medium">Corn</div>
                  <div className="border-r p-2 bg-gray-100 dark:bg-gray-800"></div>
                  <div className="border-r p-2 bg-blue-100 dark:bg-blue-900">Prepare</div>
                  <div className="border-r p-2 bg-green-100 dark:bg-green-900">Plant</div>
                  <div className="border-r p-2 bg-yellow-100 dark:bg-yellow-900">Grow</div>
                  <div className="border-r p-2 bg-amber-100 dark:bg-amber-900">Harvest</div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800"></div>
                </div>
                <div className="grid grid-cols-7 text-center text-xs">
                  <div className="border-r p-2 font-medium">Soybeans</div>
                  <div className="border-r p-2 bg-gray-100 dark:bg-gray-800"></div>
                  <div className="border-r p-2 bg-gray-100 dark:bg-gray-800"></div>
                  <div className="border-r p-2 bg-blue-100 dark:bg-blue-900">Prepare</div>
                  <div className="border-r p-2 bg-green-100 dark:bg-green-900">Plant</div>
                  <div className="border-r p-2 bg-yellow-100 dark:bg-yellow-900">Grow</div>
                  <div className="p-2 bg-amber-100 dark:bg-amber-900">Harvest</div>
                </div>
                <div className="grid grid-cols-7 text-center text-xs">
                  <div className="border-r p-2 font-medium">Wheat</div>
                  <div className="border-r p-2 bg-yellow-100 dark:bg-yellow-900">Grow</div>
                  <div className="border-r p-2 bg-amber-100 dark:bg-amber-900">Harvest</div>
                  <div className="border-r p-2 bg-gray-100 dark:bg-gray-800"></div>
                  <div className="border-r p-2 bg-gray-100 dark:bg-gray-800"></div>
                  <div className="border-r p-2 bg-blue-100 dark:bg-blue-900">Prepare</div>
                  <div className="p-2 bg-green-100 dark:bg-green-900">Plant</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                * Schedule is optimized based on local climate data and soil conditions
              </div>
            </div>
          </TabsContent>
          <TabsContent value="zones" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L40,0 L40,60 L0,60 Z" fill="#22c55e" fillOpacity="0.7" />
                  <path d="M40,0 L100,0 L100,60 L40,60 Z" fill="#3b82f6" fillOpacity="0.7" />
                  <path d="M0,60 L100,60 L100,100 L0,100 Z" fill="#eab308" fillOpacity="0.7" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div className="rounded-md bg-white/90 p-2 text-center text-xs dark:bg-black/90">
                    <div className="font-medium">Zone A</div>
                    <div className="text-green-600 dark:text-green-400">Corn</div>
                  </div>
                  <div className="rounded-md bg-white/90 p-2 text-center text-xs dark:bg-black/90">
                    <div className="font-medium">Zone B</div>
                    <div className="text-blue-600 dark:text-blue-400">Soybeans</div>
                  </div>
                  <div className="rounded-md bg-white/90 p-2 text-center text-xs dark:bg-black/90">
                    <div className="font-medium">Zone C</div>
                    <div className="text-yellow-600 dark:text-yellow-400">Wheat</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Planting zones are determined by soil type, moisture levels, and sun exposure
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

