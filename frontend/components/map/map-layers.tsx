"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function MapLayers() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Map Layers</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="satellite" defaultChecked />
          <Label htmlFor="satellite">Satellite Imagery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="boundaries" defaultChecked />
          <Label htmlFor="boundaries">Field Boundaries</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="moisture" defaultChecked />
          <Label htmlFor="moisture">Soil Moisture</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="ndvi" defaultChecked />
          <Label htmlFor="ndvi">NDVI (Crop Health)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="zones" />
          <Label htmlFor="zones">Planting Zones</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="irrigation" />
          <Label htmlFor="irrigation">Irrigation System</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="drone-path" />
          <Label htmlFor="drone-path">Drone Flight Path</Label>
        </div>
      </CardContent>
    </Card>
  )
}

