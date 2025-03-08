"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Maximize2, Layers } from "lucide-react"

export function FieldMap({ id }: { id: string }) {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Field Map</CardTitle>
          <CardDescription>Drone imagery and data overlays</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="satellite">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="satellite">Satellite</TabsTrigger>
            <TabsTrigger value="moisture">Moisture</TabsTrigger>
            <TabsTrigger value="ndvi">NDVI</TabsTrigger>
          </TabsList>
          <TabsContent value="satellite" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center"></div>
              <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                Captured today at 10:32 AM
              </div>
            </div>
          </TabsContent>
          <TabsContent value="moisture" className="pt-4">
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
          </TabsContent>
          <TabsContent value="ndvi" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-70"></div>
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center mix-blend-overlay"></div>
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

