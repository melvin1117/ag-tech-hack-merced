"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Maximize2, Play, Pause } from "lucide-react"
import { useState } from "react"

export function LiveFeed() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="flex items-center gap-2">
            Live Drone Feed
            <Badge variant="outline" className="bg-green-900 text-green-300">
              Live
            </Badge>
          </CardTitle>
          <CardDescription>Drone #1 - North Field</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
            Drone #1 • Battery: 78% • Alt: 120ft
          </div>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button size="icon" className="h-12 w-12 rounded-full" onClick={() => setIsPlaying(true)}>
                <Play className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

