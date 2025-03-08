"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Camera, Video, Pause, Play } from "lucide-react"
import { useState } from "react"

export function DroneCamera({ id }: { id: string }) {
  const [isLive, setIsLive] = useState(true)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="flex items-center gap-2">
            Live Camera Feed
            <Badge variant="outline" className="bg-green-900 text-green-300">
              Live
            </Badge>
          </CardTitle>
          <CardDescription>
            Real-time video from{" "}
            {id === "drone-1" ? "Drone #1" : id === "drone-2" ? "Drone #2" : id === "drone-3" ? "Drone #3" : "Drone #4"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsLive(!isLive)}>
            {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Video className="h-4 w-4" />
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
            {id === "drone-1" ? "Drone #1" : id === "drone-2" ? "Drone #2" : id === "drone-3" ? "Drone #3" : "Drone #4"}{" "}
            • Battery: {id === "drone-1" ? "78%" : id === "drone-2" ? "64%" : id === "drone-3" ? "42%" : "100%"} • Alt:
            120ft
          </div>
          {!isLive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button size="icon" className="h-12 w-12 rounded-full" onClick={() => setIsLive(true)}>
                <Play className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

