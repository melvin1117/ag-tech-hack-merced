"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layers, Maximize2, RotateCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DroneFlightPath({ id }: { id: string }) {
  const [showPatterns, setShowPatterns] = useState(true)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Flight Path</CardTitle>
          <CardDescription>Current and planned drone patrol routes</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowPatterns(!showPatterns)}>
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center opacity-20"></div>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                {/* North Field */}
                <path
                  d="M50,50 L250,50 L250,150 L50,150 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="150" y="40" fill="#fff" fontSize="12" textAnchor="middle">
                  North Field
                </text>

                {/* East Field */}
                <path
                  d="M300,50 L550,50 L550,200 L300,200 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="425" y="40" fill="#fff" fontSize="12" textAnchor="middle">
                  East Field
                </text>

                {/* South Field */}
                <path
                  d="M50,200 L250,200 L250,250 L50,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="150" y="190" fill="#fff" fontSize="12" textAnchor="middle">
                  South Field
                </text>

                {/* West Field */}
                <path
                  d="M300,220 L550,220 L550,250 L300,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="425" y="210" fill="#fff" fontSize="12" textAnchor="middle">
                  West Field
                </text>

                {/* Farm HQ */}
                <rect x="150" y="170" width="50" height="20" fill="#475569" stroke="#fff" strokeWidth="1" />
                <text x="175" y="183" fill="#fff" fontSize="8" textAnchor="middle">
                  Farm HQ
                </text>

                {id === "drone-1" && (
                  <>
                    {/* Current position */}
                    <circle cx="150" cy="100" r="5" fill="#22c55e" />

                    {/* Flight path - completed */}
                    <path d="M175,170 L50,100 L250,100 L150,100" stroke="#22c55e" strokeWidth="2" fill="none" />

                    {/* Flight path - planned */}
                    <path
                      d="M150,100 L250,100 L250,150 L50,150 L50,100"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                    />

                    {showPatterns && (
                      <>
                        {/* Patrol pattern */}
                        <path d="M50,70 L250,70" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,90 L250,90" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,110 L250,110" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,130 L250,130" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                      </>
                    )}

                    {/* Direction indicator */}
                    <path d="M150,100 L160,95 L160,105 Z" fill="#22c55e" />
                  </>
                )}

                {id === "drone-2" && (
                  <>
                    {/* Current position */}
                    <circle cx="425" cy="125" r="5" fill="#3b82f6" />

                    {/* Flight path - completed */}
                    <path d="M175,170 L300,125 L425,125" stroke="#3b82f6" strokeWidth="2" fill="none" />

                    {/* Flight path - planned */}
                    <path
                      d="M425,125 L550,125 L550,200 L300,200 L300,125"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                    />

                    {showPatterns && (
                      <>
                        {/* Patrol pattern */}
                        <path d="M300,75 L550,75" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M300,100 L550,100" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M300,125 L550,125" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M300,150 L550,150" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M300,175 L550,175" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                      </>
                    )}

                    {/* Direction indicator */}
                    <path d="M425,125 L435,120 L435,130 Z" fill="#3b82f6" />
                  </>
                )}

                {(id === "drone-3" || id === "drone-4") && (
                  <>
                    {/* Current position at Farm HQ */}
                    <circle cx="175" cy="180" r="5" fill={id === "drone-3" ? "#f59e0b" : "#64748b"} />
                  </>
                )}
              </svg>

              <div className="absolute bottom-2 right-2 rounded-md bg-background/80 p-2 text-xs backdrop-blur-sm">
                <div className="font-medium">Mission Details</div>
                {id === "drone-1" && (
                  <div className="mt-1 space-y-1">
                    <div>North Field - Row Scan</div>
                    <div>Progress: 45%</div>
                    <div>ETA: 15 minutes</div>
                  </div>
                )}
                {id === "drone-2" && (
                  <div className="mt-1 space-y-1">
                    <div>East Field - Disease Detection</div>
                    <div>Progress: 30%</div>
                    <div>ETA: 25 minutes</div>
                  </div>
                )}
                {id === "drone-3" && (
                  <div className="mt-1 space-y-1">
                    <div>Status: Charging at Base</div>
                    <div>Next Mission: South Field</div>
                    <div>Scheduled: 2:30 PM</div>
                  </div>
                )}
                {id === "drone-4" && (
                  <div className="mt-1 space-y-1">
                    <div>Status: Idle at Base</div>
                    <div>No missions scheduled</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Flight Statistics</div>
                <div className="mt-2 space-y-2 text-xs">
                  {(id === "drone-1" || id === "drone-2") && (
                    <>
                      <div className="flex justify-between">
                        <span>Distance Traveled:</span>
                        <span className="font-medium">{id === "drone-1" ? "1.2 miles" : "0.8 miles"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area Covered:</span>
                        <span className="font-medium">{id === "drone-1" ? "45 acres" : "32 acres"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Flight Time:</span>
                        <span className="font-medium">{id === "drone-1" ? "25 minutes" : "18 minutes"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Speed:</span>
                        <span className="font-medium">{id === "drone-1" ? "18 mph" : "15 mph"}</span>
                      </div>
                    </>
                  )}
                  {(id === "drone-3" || id === "drone-4") && (
                    <div className="flex h-20 items-center justify-center">
                      <span className="text-muted-foreground">No active flight</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Mission Controls</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(id === "drone-1" || id === "drone-2") && (
                    <>
                      <Button size="sm">Modify Path</Button>
                      <Button size="sm" variant="outline">
                        Return Home
                      </Button>
                      <Button size="sm" variant="destructive">
                        Emergency Stop
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </>
                  )}
                  {id === "drone-3" && (
                    <>
                      <Button size="sm">Deploy Now</Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="col-span-2">
                        View Scheduled Mission
                      </Button>
                    </>
                  )}
                  {id === "drone-4" && (
                    <>
                      <Button size="sm">Deploy Now</Button>
                      <Button size="sm" variant="outline">
                        Schedule Mission
                      </Button>
                      <Button size="sm" variant="outline" className="col-span-2">
                        View Available Missions
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="planned" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center opacity-20"></div>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                {/* North Field */}
                <path
                  d="M50,50 L250,50 L250,150 L50,150 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="150" y="40" fill="#fff" fontSize="12" textAnchor="middle">
                  North Field
                </text>

                {/* East Field */}
                <path
                  d="M300,50 L550,50 L550,200 L300,200 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="425" y="40" fill="#fff" fontSize="12" textAnchor="middle">
                  East Field
                </text>

                {/* South Field */}
                <path
                  d="M50,200 L250,200 L250,250 L50,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="150" y="190" fill="#fff" fontSize="12" textAnchor="middle">
                  South Field
                </text>

                {/* West Field */}
                <path
                  d="M300,220 L550,220 L550,250 L300,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="425" y="210" fill="#fff" fontSize="12" textAnchor="middle">
                  West Field
                </text>

                {/* Farm HQ */}
                <rect x="150" y="170" width="50" height="20" fill="#475569" stroke="#fff" strokeWidth="1" />
                <text x="175" y="183" fill="#fff" fontSize="8" textAnchor="middle">
                  Farm HQ
                </text>

                {/* Planned missions */}
                {id === "drone-1" && (
                  <>
                    {/* Current position */}
                    <circle cx="175" cy="180" r="5" fill="#22c55e" />

                    {/* Planned mission - South Field */}
                    <path
                      d="M175,180 L150,225 L50,225 L50,250 L250,250 L250,200 L150,200 L175,180"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                    />

                    {showPatterns && (
                      <>
                        {/* Patrol pattern */}
                        <path d="M50,210 L250,210" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,225 L250,225" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,240 L250,240" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                      </>
                    )}
                  </>
                )}

                {id === "drone-3" && (
                  <>
                    {/* Current position */}
                    <circle cx="175" cy="180" r="5" fill="#f59e0b" />

                    {/* Planned mission - South Field */}
                    <path
                      d="M175,180 L150,225 L50,225 L50,250 L250,250 L250,200 L150,200 L175,180"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                    />

                    {showPatterns && (
                      <>
                        {/* Patrol pattern */}
                        <path d="M50,210 L250,210" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,225 L250,225" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                        <path d="M50,240 L250,240" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                      </>
                    )}
                  </>
                )}

                {id === "drone-4" && (
                  <text x="300" y="150" fill="#fff" fontSize="14" textAnchor="middle">
                    No missions scheduled
                  </text>
                )}
              </svg>

              <div className="absolute bottom-2 right-2 rounded-md bg-background/80 p-2 text-xs backdrop-blur-sm">
                <div className="font-medium">Planned Missions</div>
                {id === "drone-1" && (
                  <div className="mt-1 space-y-1">
                    <div>South Field - Full Scan</div>
                    <div>Scheduled: After current mission</div>
                    <div>Est. Duration: 30 minutes</div>
                  </div>
                )}
                {id === "drone-2" && (
                  <div className="mt-1 space-y-1">
                    <div>North Field - Moisture Scan</div>
                    <div>Scheduled: After current mission</div>
                    <div>Est. Duration: 25 minutes</div>
                  </div>
                )}
                {id === "drone-3" && (
                  <div className="mt-1 space-y-1">
                    <div>South Field - Disease Detection</div>
                    <div>Scheduled: Today at 2:30 PM</div>
                    <div>Est. Duration: 35 minutes</div>
                  </div>
                )}
                {id === "drone-4" && (
                  <div className="mt-1 space-y-1">
                    <div>No missions scheduled</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-md border p-3">
              <div className="text-sm font-medium">Mission Schedule</div>
              <div className="mt-2 space-y-3">
                {(id === "drone-1" || id === "drone-2" || id === "drone-3") && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium">
                          {id === "drone-1"
                            ? "South Field - Full Scan"
                            : id === "drone-2"
                              ? "North Field - Moisture Scan"
                              : "South Field - Disease Detection"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {id === "drone-1" || id === "drone-2" ? "After current mission" : "Today at 2:30 PM"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline">
                        Modify
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                {id === "drone-4" && (
                  <div className="flex h-20 items-center justify-center">
                    <span className="text-muted-foreground">No missions scheduled</span>
                  </div>
                )}
                <Button size="sm" className="w-full">
                  Schedule New Mission
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center opacity-20"></div>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                {/* North Field */}
                <path
                  d="M50,50 L250,50 L250,150 L50,150 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="150" y="40" fill="#fff" fontSize="12" textAnchor="middle">
                  North Field
                </text>

                {/* East Field */}
                <path
                  d="M300,50 L550,50 L550,200 L300,200 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="425" y="40" fill="#fff" fontSize="12" textAnchor="middle">
                  East Field
                </text>

                {/* South Field */}
                <path
                  d="M50,200 L250,200 L250,250 L50,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="150" y="190" fill="#fff" fontSize="12" textAnchor="middle">
                  South Field
                </text>

                {/* West Field */}
                <path
                  d="M300,220 L550,220 L550,250 L300,250 Z"
                  fill="#1e293b"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="425" y="210" fill="#fff" fontSize="12" textAnchor="middle">
                  West Field
                </text>

                {/* Farm HQ */}
                <rect x="150" y="170" width="50" height="20" fill="#475569" stroke="#fff" strokeWidth="1" />
                <text x="175" y="183" fill="#fff" fontSize="8" textAnchor="middle">
                  Farm HQ
                </text>

                {/* Historical flight paths */}
                <path
                  d="M175,180 L50,100 L250,100 L250,150 L50,150 L50,100"
                  stroke="#22c55e"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="none"
                />

                <path
                  d="M175,180 L300,125 L550,125 L550,200 L300,200 L300,125"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="none"
                />

                <path
                  d="M175,180 L150,225 L250,225 L250,250 L50,250 L50,225 L150,225"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="none"
                />
              </svg>

              <div className="absolute bottom-2 right-2 rounded-md bg-background/80 p-2 text-xs backdrop-blur-sm">
                <div className="font-medium">Flight History</div>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>North Field - Yesterday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>East Field - This morning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span>South Field - 2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">East Field Scan</div>
                  <div className="text-xs text-muted-foreground">Today, 8:30 AM</div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>3.2 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Area Covered:</span>
                    <span>110 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Findings:</span>
                    <span className="text-amber-400">Disease detected</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  View Details
                </Button>
              </div>

              <div className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">North Field Scan</div>
                  <div className="text-xs text-muted-foreground">Yesterday, 2:15 PM</div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>38 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span>2.8 miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Area Covered:</span>
                    <span>95 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Findings:</span>
                    <span className="text-green-400">All normal</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  View Details
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

