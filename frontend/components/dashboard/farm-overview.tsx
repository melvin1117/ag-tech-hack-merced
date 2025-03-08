"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crop, MapPin, Ruler } from "lucide-react"

export function FarmOverview() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Farm Overview</CardTitle>
        <CardDescription>Summary of your farm's key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="land">Land</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Total Area</p>
                  <p className="text-xl font-bold">120 acres</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Crop className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Planted Area</p>
                  <p className="text-xl font-bold">85 acres</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Location</p>
                  <p className="text-xl font-bold">Midwest Region</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="crops" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium leading-none">Current Crops</p>
                <ul className="mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Corn</span>
                    <span className="text-muted-foreground">45 acres</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Soybeans</span>
                    <span className="text-muted-foreground">30 acres</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wheat</span>
                    <span className="text-muted-foreground">10 acres</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Crop Health</p>
                <div className="mt-2 h-20 w-full rounded-md bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="bg-white dark:bg-black rounded-full h-4 w-4 border-2 border-primary absolute"
                      style={{ left: "30%" }}
                    ></div>
                    <span className="text-xs font-medium">Overall: Good</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="land" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium leading-none">Soil Types</p>
                <ul className="mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Clay Loam</span>
                    <span className="text-muted-foreground">60 acres</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sandy Loam</span>
                    <span className="text-muted-foreground">40 acres</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Silt Loam</span>
                    <span className="text-muted-foreground">20 acres</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Land Usage</p>
                <div className="mt-2 grid grid-cols-4 gap-1 text-center text-xs">
                  <div className="rounded bg-green-500 p-2 text-white">Crops</div>
                  <div className="rounded bg-blue-500 p-2 text-white">Water</div>
                  <div className="rounded bg-amber-500 p-2 text-white">Fallow</div>
                  <div className="rounded bg-gray-500 p-2 text-white">Other</div>
                </div>
                <div className="mt-1 h-4 w-full rounded-md overflow-hidden flex">
                  <div className="bg-green-500 h-full" style={{ width: "70%" }}></div>
                  <div className="bg-blue-500 h-full" style={{ width: "5%" }}></div>
                  <div className="bg-amber-500 h-full" style={{ width: "15%" }}></div>
                  <div className="bg-gray-500 h-full" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

