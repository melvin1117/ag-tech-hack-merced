"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"

export function DiseaseProgression({ id }: { id: string }) {
  // In a real app, we would fetch disease data based on the ID
  const diseaseData = {
    name: id === "east-field" ? "Soybean Rust" : id === "south-field" ? "Powdery Mildew" : "None",
    status: id === "east-field" ? "Active" : id === "south-field" ? "Early Signs" : "None",
    firstDetected: id === "east-field" ? "2 days ago" : id === "south-field" ? "Today" : "N/A",
    affectedArea: id === "east-field" ? "25 acres (22%)" : id === "south-field" ? "5 acres (5%)" : "0 acres (0%)",
    spreadRate: id === "east-field" ? "Moderate" : id === "south-field" ? "Low" : "N/A",
    treatment:
      id === "east-field" ? "Fungicide application recommended" : id === "south-field" ? "Monitor daily" : "N/A",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Disease Progression</CardTitle>
          <CardDescription>Tracking disease spread and treatment effectiveness</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        {diseaseData.name === "None" ? (
          <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">No disease detected in this field</p>
              <p className="text-xs">Last scan: Today at 10:32 AM</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="timeline">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="map">Spread Map</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{diseaseData.name}</div>
                  <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        diseaseData.status === "Active" ? "bg-red-500" : "bg-yellow-500"
                      }`}
                    ></div>
                    <span>{diseaseData.status}</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-2 top-0 h-full w-0.5 bg-muted"></div>

                  {id === "east-field" && (
                    <>
                      <div className="relative mb-4 pl-7">
                        <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-900">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Today, 10:32 AM</span>
                        </div>
                        <div className="text-sm font-medium">Spread to 25 acres (22% of field)</div>
                        <div className="text-xs text-muted-foreground">
                          Disease has spread to additional 10 acres since yesterday. Urgent treatment recommended.
                        </div>
                      </div>

                      <div className="relative mb-4 pl-7">
                        <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-900">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Yesterday, 10:15 AM</span>
                        </div>
                        <div className="text-sm font-medium">Spread to 15 acres (13% of field)</div>
                        <div className="text-xs text-muted-foreground">
                          Disease has spread from initial detection area. Treatment plan generated.
                        </div>
                      </div>

                      <div className="relative pl-7">
                        <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-900">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">2 days ago, 11:45 AM</span>
                        </div>
                        <div className="text-sm font-medium">Initial Detection - 5 acres (4% of field)</div>
                        <div className="text-xs text-muted-foreground">
                          Soybean Rust detected in southeastern section of field. Monitoring initiated.
                        </div>
                      </div>
                    </>
                  )}

                  {id === "south-field" && (
                    <div className="relative pl-7">
                      <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-900">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Today, 10:32 AM</span>
                      </div>
                      <div className="text-sm font-medium">Initial Detection - 5 acres (5% of field)</div>
                      <div className="text-xs text-muted-foreground">
                        Early signs of Powdery Mildew detected in northwestern corner. Daily monitoring recommended.
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-md border p-3">
                  <div className="text-sm font-medium">Treatment Recommendation</div>
                  <div className="mt-2 text-xs text-muted-foreground">{diseaseData.treatment}</div>
                  {id === "east-field" && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Button size="sm">Schedule Treatment</Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="map" className="pt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] bg-cover bg-center opacity-20"></div>

                {id === "east-field" && (
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 600 300"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Field outline */}
                    <path
                      d="M50,50 L550,50 L550,250 L50,250 Z"
                      fill="#1e293b"
                      fillOpacity="0.6"
                      stroke="#fff"
                      strokeWidth="2"
                    />

                    {/* Disease spread - Day 1 */}
                    <path
                      d="M450,150 L500,200 L450,220 L400,180 Z"
                      fill="#eab308"
                      fillOpacity="0.7"
                      stroke="#fff"
                      strokeWidth="1"
                    />

                    {/* Disease spread - Day 2 */}
                    <path
                      d="M400,150 L500,150 L500,220 L400,220 Z"
                      fill="#f59e0b"
                      fillOpacity="0.7"
                      stroke="#fff"
                      strokeWidth="1"
                    />

                    {/* Disease spread - Today */}
                    <path
                      d="M350,120 L500,120 L500,250 L350,250 Z"
                      fill="#ef4444"
                      fillOpacity="0.7"
                      stroke="#fff"
                      strokeWidth="1"
                    />

                    <text x="300" y="30" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">
                      East Field - Soybean Rust Progression
                    </text>

                    {/* Legend */}
                    <rect x="50" y="270" width="15" height="15" fill="#eab308" fillOpacity="0.7" />
                    <text x="75" y="282" fill="#fff" fontSize="12" dominantBaseline="middle">
                      Initial Detection (2 days ago)
                    </text>

                    <rect x="250" y="270" width="15" height="15" fill="#f59e0b" fillOpacity="0.7" />
                    <text x="275" y="282" fill="#fff" fontSize="12" dominantBaseline="middle">
                      Day 2 Spread (Yesterday)
                    </text>

                    <rect x="450" y="270" width="15" height="15" fill="#ef4444" fillOpacity="0.7" />
                    <text x="475" y="282" fill="#fff" fontSize="12" dominantBaseline="middle">
                      Current Spread (Today)
                    </text>
                  </svg>
                )}

                {id === "south-field" && (
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 600 300"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Field outline */}
                    <path
                      d="M50,50 L550,50 L550,250 L50,250 Z"
                      fill="#1e293b"
                      fillOpacity="0.6"
                      stroke="#fff"
                      strokeWidth="2"
                    />

                    {/* Disease spread - Today */}
                    <path
                      d="M100,100 L150,100 L150,150 L100,150 Z"
                      fill="#eab308"
                      fillOpacity="0.7"
                      stroke="#fff"
                      strokeWidth="1"
                    />

                    <text x="300" y="30" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">
                      South Field - Powdery Mildew Detection
                    </text>

                    {/* Legend */}
                    <rect x="50" y="270" width="15" height="15" fill="#eab308" fillOpacity="0.7" />
                    <text x="75" y="282" fill="#fff" fontSize="12" dominantBaseline="middle">
                      Initial Detection (Today)
                    </text>
                  </svg>
                )}
              </div>

              <div className="mt-4 rounded-md border p-3">
                <div className="text-sm font-medium">Spread Analysis</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {id === "east-field" ? (
                    <>
                      Disease is spreading at a rate of approximately{" "}
                      <span className="font-medium">5-10 acres per day</span>. Current environmental conditions are
                      favorable for continued spread. Without treatment, projected infection could reach{" "}
                      <span className="font-medium">60% of field within 5 days</span>.
                    </>
                  ) : (
                    <>
                      Early detection allows for preventative measures. Current environmental conditions indicate{" "}
                      <span className="font-medium">low risk of rapid spread</span>. With monitoring and early
                      intervention, spread can likely be contained to{" "}
                      <span className="font-medium">less than 10% of field</span>.
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

