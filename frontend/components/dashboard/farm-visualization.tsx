"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Info, Layers, Maximize2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FarmVisualization() {
  const [showLegend, setShowLegend] = useState(true)

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Farm Visualization</CardTitle>
          <CardDescription>Visual health and disease tracking across your fields</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowLegend(!showLegend)}>
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="health">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="health">Crop Health</TabsTrigger>
            <TabsTrigger value="disease">Disease Detection</TabsTrigger>
            <TabsTrigger value="growth">Growth Stage</TabsTrigger>
            <TabsTrigger value="drones">Drone Patrols</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="pt-4">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] bg-cover bg-center opacity-20"></div>

              {/* Farm visualization with SVG overlay */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* North Field - Mostly healthy with some issues */}
                <path
                  d="M100,100 L400,100 L400,250 L100,250 Z"
                  fill="#22c55e"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M250,150 L350,150 L350,200 L250,200 Z"
                  fill="#eab308"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <text x="250" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  North Field
                </text>
                <text x="250" y="150" fill="#fff" fontSize="12">
                  Corn - 92% Healthy
                </text>

                {/* East Field - Mixed health */}
                <path
                  d="M450,100 L700,100 L700,300 L450,300 Z"
                  fill="#eab308"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M500,150 L650,250 L550,275 L500,200 Z"
                  fill="#ef4444"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <path
                  d="M600,120 L680,180 L650,220 L570,170 Z"
                  fill="#22c55e"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <text x="575" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  East Field
                </text>
                <text x="575" y="150" fill="#fff" fontSize="12">
                  Soybeans - 68% Healthy
                </text>

                {/* South Field - Mostly healthy */}
                <path
                  d="M100,300 L400,300 L400,450 L100,450 Z"
                  fill="#22c55e"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M150,350 L200,350 L200,400 L150,400 Z"
                  fill="#eab308"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <text x="250" y="330" fill="#fff" fontSize="16" fontWeight="bold">
                  South Field
                </text>
                <text x="250" y="350" fill="#fff" fontSize="12">
                  Wheat - 95% Healthy
                </text>

                {/* West Field - Fallow */}
                <path
                  d="M450,350 L700,350 L700,450 L450,450 Z"
                  fill="#64748b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="400" fill="#fff" fontSize="16" fontWeight="bold">
                  West Field
                </text>
                <text x="575" y="420" fill="#fff" fontSize="12">
                  Fallow
                </text>

                {/* Farm buildings */}
                <rect x="800" y="200" width="100" height="100" fill="#475569" stroke="#fff" strokeWidth="2" />
                <text x="850" y="260" fill="#fff" fontSize="14" textAnchor="middle">
                  Farm HQ
                </text>
              </svg>

              {showLegend && (
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-background/90 p-3 backdrop-blur-sm">
                  <div className="text-xs font-medium">Health Status</div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Healthy (NDVI &gt; 0.7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Moderate Stress (NDVI 0.5-0.7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">High Stress (NDVI &lt; 0.5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                    <span className="text-xs">Fallow/Unplanted</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">North Field</div>
                <div className="mt-1 text-2xl font-bold text-green-400">92%</div>
                <div className="text-xs text-muted-foreground">Healthy area</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">East Field</div>
                <div className="mt-1 text-2xl font-bold text-yellow-400">68%</div>
                <div className="text-xs text-muted-foreground">Healthy area</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">South Field</div>
                <div className="mt-1 text-2xl font-bold text-green-400">95%</div>
                <div className="text-xs text-muted-foreground">Healthy area</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Farm Average</div>
                <div className="mt-1 text-2xl font-bold text-green-400">85%</div>
                <div className="text-xs text-muted-foreground">Overall health</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="disease" className="pt-4">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] bg-cover bg-center opacity-20"></div>

              {/* Farm visualization with SVG overlay */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* North Field - Mostly healthy with some issues */}
                <path
                  d="M100,100 L400,100 L400,250 L100,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="250" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  North Field
                </text>
                <text x="250" y="150" fill="#fff" fontSize="12">
                  Corn - No Disease Detected
                </text>

                {/* East Field - Disease detected */}
                <path
                  d="M450,100 L700,100 L700,300 L450,300 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M500,150 L650,250 L550,275 L500,200 Z"
                  fill="#ef4444"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <circle cx="575" cy="200" r="15" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                <circle cx="600" cy="225" r="10" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                <circle cx="550" cy="225" r="12" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                <text x="575" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  East Field
                </text>
                <text x="575" y="150" fill="#fff" fontSize="12">
                  Soybeans - Rust Detected
                </text>

                {/* South Field - Early disease signs */}
                <path
                  d="M100,300 L400,300 L400,450 L100,450 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M150,350 L200,350 L200,400 L150,400 Z"
                  fill="#eab308"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <circle cx="175" cy="375" r="10" fill="#eab308" stroke="#fff" strokeWidth="1" />
                <text x="250" y="330" fill="#fff" fontSize="16" fontWeight="bold">
                  South Field
                </text>
                <text x="250" y="350" fill="#fff" fontSize="12">
                  Wheat - Early Powdery Mildew Signs
                </text>

                {/* West Field - Fallow */}
                <path
                  d="M450,350 L700,350 L700,450 L450,450 Z"
                  fill="#64748b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="400" fill="#fff" fontSize="16" fontWeight="bold">
                  West Field
                </text>
                <text x="575" y="420" fill="#fff" fontSize="12">
                  Fallow
                </text>

                {/* Farm buildings */}
                <rect x="800" y="200" width="100" height="100" fill="#475569" stroke="#fff" strokeWidth="2" />
                <text x="850" y="260" fill="#fff" fontSize="14" textAnchor="middle">
                  Farm HQ
                </text>
              </svg>

              {showLegend && (
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-background/90 p-3 backdrop-blur-sm">
                  <div className="text-xs font-medium">Disease Status</div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-700"></div>
                    <span className="text-xs">No Disease Detected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Early Signs (Monitor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Active Disease (Treat)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                    <span className="text-xs">Fallow/Unplanted</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">East Field - Soybean Rust</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <span className="font-medium">Active Infection</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Detected:</span> 2 days ago
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">Affected Area:</span> ~25 acres (22%)
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">Recommendation:</span> Apply fungicide within 48 hours
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">South Field - Powdery Mildew</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Early Signs</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Detected:</span> Today
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">Affected Area:</span> ~5 acres (5%)
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">Recommendation:</span> Monitor daily, prepare preventative treatment
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="pt-4">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] bg-cover bg-center opacity-20"></div>

              {/* Farm visualization with SVG overlay */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* North Field - Corn */}
                <path
                  d="M100,100 L400,100 L400,250 L100,250 Z"
                  fill="#22c55e"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="250" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  North Field
                </text>
                <text x="250" y="150" fill="#fff" fontSize="12">
                  Corn - Reproductive Stage (R3)
                </text>

                {/* East Field - Soybeans */}
                <path
                  d="M450,100 L700,100 L700,300 L450,300 Z"
                  fill="#3b82f6"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  East Field
                </text>
                <text x="575" y="150" fill="#fff" fontSize="12">
                  Soybeans - Vegetative Stage (V6)
                </text>

                {/* South Field - Wheat */}
                <path
                  d="M100,300 L400,300 L400,450 L100,450 Z"
                  fill="#f59e0b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="250" y="330" fill="#fff" fontSize="16" fontWeight="bold">
                  South Field
                </text>
                <text x="250" y="350" fill="#fff" fontSize="12">
                  Wheat - Heading Stage
                </text>

                {/* West Field - Fallow */}
                <path
                  d="M450,350 L700,350 L700,450 L450,450 Z"
                  fill="#64748b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="400" fill="#fff" fontSize="16" fontWeight="bold">
                  West Field
                </text>
                <text x="575" y="420" fill="#fff" fontSize="12">
                  Fallow
                </text>

                {/* Farm buildings */}
                <rect x="800" y="200" width="100" height="100" fill="#475569" stroke="#fff" strokeWidth="2" />
                <text x="850" y="260" fill="#fff" fontSize="14" textAnchor="middle">
                  Farm HQ
                </text>
              </svg>

              {showLegend && (
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-background/90 p-3 backdrop-blur-sm">
                  <div className="text-xs font-medium">Growth Stages</div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Vegetative Stage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Reproductive Stage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Maturation Stage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                    <span className="text-xs">Fallow/Unplanted</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">North Field - Corn</div>
                <div className="mt-1 text-lg font-bold">Reproductive Stage (R3)</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[65%] rounded-full bg-green-500"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Planting</span>
                  <span>Current</span>
                  <span>Harvest</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Est. Harvest:</span> 35 days
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">East Field - Soybeans</div>
                <div className="mt-1 text-lg font-bold">Vegetative Stage (V6)</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[40%] rounded-full bg-blue-500"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Planting</span>
                  <span>Current</span>
                  <span>Harvest</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Est. Harvest:</span> 65 days
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">South Field - Wheat</div>
                <div className="mt-1 text-lg font-bold">Heading Stage</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[80%] rounded-full bg-amber-500"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Planting</span>
                  <span>Current</span>
                  <span>Harvest</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Est. Harvest:</span> 15 days
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drones" className="pt-4">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] bg-cover bg-center opacity-20"></div>

              {/* Farm visualization with SVG overlay */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* North Field */}
                <path
                  d="M100,100 L400,100 L400,250 L100,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="250" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  North Field
                </text>

                {/* East Field */}
                <path
                  d="M450,100 L700,100 L700,300 L450,300 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  East Field
                </text>

                {/* South Field */}
                <path
                  d="M100,300 L400,300 L400,450 L100,450 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="250" y="330" fill="#fff" fontSize="16" fontWeight="bold">
                  South Field
                </text>

                {/* West Field */}
                <path
                  d="M450,350 L700,350 L700,450 L450,450 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="400" fill="#fff" fontSize="16" fontWeight="bold">
                  West Field
                </text>

                {/* Farm buildings */}
                <rect x="800" y="200" width="100" height="100" fill="#475569" stroke="#fff" strokeWidth="2" />
                <text x="850" y="260" fill="#fff" fontSize="14" textAnchor="middle">
                  Farm HQ
                </text>

                {/* Drone 1 - Active patrol pattern */}
                <path
                  d="M100,100 L400,100 L400,250 L100,250 L100,100"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  fill="none"
                />
                <path d="M100,120 L400,120" stroke="#22c55e" strokeWidth="2" fill="none" />
                <path d="M100,140 L400,140" stroke="#22c55e" strokeWidth="2" fill="none" />
                <path d="M100,160 L400,160" stroke="#22c55e" strokeWidth="2" fill="none" />
                <path d="M100,180 L400,180" stroke="#22c55e" strokeWidth="2" fill="none" />
                <path d="M100,200 L400,200" stroke="#22c55e" strokeWidth="2" fill="none" />
                <path d="M100,220 L400,220" stroke="#22c55e" strokeWidth="2" fill="none" />
                <circle cx="250" cy="160" r="8" fill="#22c55e" />
                <text x="250" y="160" fill="#fff" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                  1
                </text>

                {/* Drone 2 - Active patrol pattern */}
                <path
                  d="M450,100 L700,100 L700,300 L450,300 L450,100"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  fill="none"
                />
                <path d="M450,130 L700,130" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <path d="M450,160 L700,160" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <path d="M450,190 L700,190" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <path d="M450,220 L700,220" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <path d="M450,250 L700,250" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <path d="M450,280 L700,280" stroke="#3b82f6" strokeWidth="2" fill="none" />
                <circle cx="575" cy="220" r="8" fill="#3b82f6" />
                <text x="575" cy="220" fill="#fff" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                  2
                </text>

                {/* Drone 3 - Charging at base */}
                <circle cx="850" cy="230" r="8" fill="#f59e0b" />
                <text x="850" cy="230" fill="#fff" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                  3
                </text>

                {/* Drone 4 - Idle at base */}
                <circle cx="850" cy="250" r="8" fill="#64748b" />
                <text x="850" cy="250" fill="#fff" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                  4
                </text>
              </svg>

              {showLegend && (
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-background/90 p-3 backdrop-blur-sm">
                  <div className="text-xs font-medium">Drone Status</div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Drone #1 - Flying (North Field)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Drone #2 - Scanning (East Field)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Drone #3 - Charging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                    <span className="text-xs">Drone #4 - Idle</span>
                  </div>
                </div>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute left-[250px] top-[160px] h-4 w-4 cursor-pointer rounded-full bg-green-500"></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs font-medium">Drone #1</div>
                    <div className="text-xs">Battery: 78%</div>
                    <div className="text-xs">Speed: 18 mph</div>
                    <div className="text-xs">Altitude: 120 ft</div>
                    <div className="text-xs">Mission: Routine Scan</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute left-[575px] top-[220px] h-4 w-4 cursor-pointer rounded-full bg-blue-500"></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs font-medium">Drone #2</div>
                    <div className="text-xs">Battery: 64%</div>
                    <div className="text-xs">Speed: 15 mph</div>
                    <div className="text-xs">Altitude: 100 ft</div>
                    <div className="text-xs">Mission: Disease Detection</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-md border p-3">
                  <div className="text-sm font-medium">Current Patrol Coverage</div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">North Field</div>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="font-medium">100%</div>
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div className="h-full w-full rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">East Field</div>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="font-medium">85%</div>
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">South Field</div>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="font-medium">0%</div>
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div className="h-full w-0 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">West Field</div>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="font-medium">0%</div>
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div className="h-full w-0 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Patrol Schedule</div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>North Field</span>
                    </div>
                    <div>In Progress (Drone #1)</div>
                    <div>ETA: 15 min</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>East Field</span>
                    </div>
                    <div>In Progress (Drone #2)</div>
                    <div>ETA: 25 min</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>South Field</span>
                    </div>
                    <div>Scheduled</div>
                    <div>Today 2:30 PM</div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                      <span>West Field</span>
                    </div>
                    <div>Not Scheduled</div>
                    <div>-</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="w-full">
                    Modify Schedule
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

