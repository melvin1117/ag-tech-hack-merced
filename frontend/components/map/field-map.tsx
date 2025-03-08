"use client"

import { Card } from "@/components/ui/card"

export function FieldMap() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="relative h-full w-full bg-muted">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-green-500/20 to-yellow-500/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Interactive map would be implemented here with a mapping library like Leaflet or Mapbox
          </div>
        </div>
      </div>
    </Card>
  )
}

