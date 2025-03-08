"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Battery, Signal, MapPin, Thermometer, Video, Camera, Pause, Play, Compass } from "lucide-react"

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
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
                {/* Drone FPV GIF - Without HUD overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-70"}`}
                >
                  <img
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjkycHVlMWlidzUzd2hrN2o5ZmQzdnVzOWt5eTVoMnhscHhtd3dsciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SULVcokl29SG5bM1L1/giphy.gif"
                    alt="Drone aerial view of farmland"
                    className="w-full h-full object-cover"
                    style={{
                      filter: isPlaying ? "none" : "grayscale(50%)",
                    }}
                  />
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

          {/* Drone Telemetry Data - Now below the GIF */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Connection Status */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Connection</h3>
                  <Signal className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Signal</span>
                    <span>Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Data Link</span>
                    <span>4G</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Latency</span>
                    <span>120ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Battery Status */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Battery</h3>
                  <Battery className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span>{batteryLevel}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        batteryLevel > 50 ? "bg-green-500" : batteryLevel > 20 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${batteryLevel}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span>~18 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Data */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Flight Data</h3>
                  <Compass className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Altitude</span>
                    <span>{altitude.toFixed(0)} ft</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Speed</span>
                    <span>{speed.toFixed(1)} mph</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span>0.8 mi</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Data */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Environment</h3>
                  <Thermometer className="h-4 w-4 text-amber-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Temperature</span>
                    <span>72°F</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Wind</span>
                    <span>8 mph NW</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Humidity</span>
                    <span>65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Information */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Location</h3>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-muted-foreground">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Coordinates</span>
                  <p>42.3601° N, 71.0589° W</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Field</span>
                  <p>North Field - Corn Section</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mission</span>
                  <p>Crop Health Monitoring</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Progress</span>
                  <div className="flex items-center gap-2">
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: "68%" }}></div>
                    </div>
                    <span>68%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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

