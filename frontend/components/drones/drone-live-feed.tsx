"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Battery,
  Signal,
  Wifi,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Clock,
  Video,
  Camera,
  Pause,
  Play,
} from "lucide-react"

export function DroneLiveFeed() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [altitude, setAltitude] = useState(120)
  const [speed, setSpeed] = useState(15)

  // Simulate changing values
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())

      // Randomly fluctuate values slightly to simulate real-time changes
      setBatteryLevel((prev) => Math.max(1, Math.min(100, prev + (Math.random() > 0.7 ? -1 : 0))))
      setAltitude((prev) => Math.max(50, Math.min(200, prev + (Math.random() > 0.5 ? Math.random() * 2 - 1 : 0))))
      setSpeed((prev) => Math.max(5, Math.min(25, prev + (Math.random() > 0.5 ? Math.random() * 2 - 1 : 0))))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Live Drone Feed</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="drone-1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select drone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drone-1">Drone 1 - North Field</SelectItem>
              <SelectItem value="drone-2">Drone 2 - East Field</SelectItem>
              <SelectItem value="drone-3">Drone 3 - South Field</SelectItem>
              <SelectItem value="drone-4">Drone 4 - West Field</SelectItem>
            </SelectContent>
          </Select>
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
          >
            Live
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
              {/* Drone FPV GIF */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-90"}`}
              >
                {/* 
                  Replace this with an actual drone FPV GIF.
                  For now, using a placeholder that simulates a GIF with CSS animation.
                */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&h=720&q=80')",
                    animation: isPlaying ? "slowPan 30s infinite alternate" : "none",
                  }}
                ></div>
              </div>

              {/* HUD Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top left - drone info */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded-md">
                  <div className="flex items-center gap-1 mb-1">
                    <Signal className="h-3 w-3" />
                    <span>Signal: Strong</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Battery className="h-3 w-3" />
                    <span>Battery: {batteryLevel}%</span>
                    <div className="w-12 h-1.5 bg-gray-700 rounded-full ml-1">
                      <div
                        className={`h-full rounded-full ${
                          batteryLevel > 50 ? "bg-green-500" : batteryLevel > 20 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${batteryLevel}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    <span>4G: Connected</span>
                  </div>
                </div>

                {/* Top right - location and time */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded-md">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>42.3601° N, 71.0589° W</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="h-3 w-3" />
                    <span>{currentTime.toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Bottom left - flight data */}
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded-md">
                  <div className="flex items-center gap-1 mb-1">
                    <span>ALT: {altitude.toFixed(0)} ft</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <span>SPD: {speed.toFixed(1)} mph</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>DST: 0.8 mi</span>
                  </div>
                </div>

                {/* Bottom right - environmental data */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded-md">
                  <div className="flex items-center gap-1 mb-1">
                    <Thermometer className="h-3 w-3" />
                    <span>72°F</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Wind className="h-3 w-3" />
                    <span>8 mph NW</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>Humidity: 65%</span>
                  </div>
                </div>

                {/* Center - crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-20 h-20">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/30"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-white/30"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Camera className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Video className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drone 1 - North Field</CardTitle>
            <CardDescription>Currently monitoring corn crops</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="status">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="controls">Controls</TabsTrigger>
              </TabsList>
              <TabsContent value="status" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Battery</span>
                    <span className="text-sm font-medium">{batteryLevel}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        batteryLevel > 50 ? "bg-green-500" : batteryLevel > 20 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${batteryLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">Altitude</div>
                    <div className="text-lg font-semibold">{altitude.toFixed(0)} ft</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">Speed</div>
                    <div className="text-lg font-semibold">{speed.toFixed(1)} mph</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">Flight Time</div>
                    <div className="text-lg font-semibold">32:15</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-xs text-muted-foreground">Distance</div>
                    <div className="text-lg font-semibold">0.8 mi</div>
                  </div>
                </div>

                <div className="rounded-lg border p-2">
                  <div className="text-xs text-muted-foreground">Mission Progress</div>
                  <div className="text-lg font-semibold">68%</div>
                  <div className="w-full h-2 bg-secondary rounded-full mt-1">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "68%" }}></div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="controls" className="pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button className="w-full">Return Home</Button>
                  <Button variant="outline" className="w-full">
                    Hover
                  </Button>
                  <Button variant="outline" className="w-full">
                    Take Photo
                  </Button>
                  <Button variant="outline" className="w-full">
                    Record Video
                  </Button>
                  <Button variant="destructive" className="w-full col-span-2">
                    Emergency Land
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

