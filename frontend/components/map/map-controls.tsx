"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DrillIcon as Drone, Locate, Plus, Minus, RotateCw } from "lucide-react"

export function MapControls() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Map Controls</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button className="w-full justify-start" variant="outline">
          <Locate className="mr-2 h-4 w-4" />
          Center Map
        </Button>
        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
          <Button className="flex-1" variant="outline">
            <Minus className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full justify-start" variant="outline">
          <RotateCw className="mr-2 h-4 w-4" />
          Reset View
        </Button>
        <Button className="w-full justify-start">
          <Drone className="mr-2 h-4 w-4" />
          Launch Drone
        </Button>
      </CardContent>
    </Card>
  )
}

