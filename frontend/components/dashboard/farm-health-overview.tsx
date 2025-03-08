import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Minus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FarmHealthOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Health Summary</CardTitle>
        <CardDescription>Overall status of your farm's key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights Map</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Average Crop Health" value="85%" change="+2%" trend="up" />
              <MetricCard title="Average Soil Moisture" value="21%" change="-3%" trend="down" />
              <MetricCard title="Yield Forecast" value="+8%" change="+1%" trend="up" />
              <MetricCard title="Active Alerts" value="3" change="+1" trend="down" />
            </div>

            <div className="mt-4 rounded-md border p-3">
              <div className="text-sm font-medium">Key Insights</div>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="text-sm">North Field section A3 requires irrigation within 24 hours</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                  <div className="text-sm">Potential pest infestation detected in East Field soybeans</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="text-sm">Optimal planting window for West Field: May 15-20</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="pt-4">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border bg-muted">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] bg-cover bg-center opacity-20"></div>

              {/* Farm visualization with SVG overlay */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* North Field - Mostly healthy with irrigation needed in section A3 */}
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
                  Corn - 92% Healthy
                </text>

                {/* Critical area in North Field - Section A3 needing irrigation */}
                <path
                  d="M250,150 L350,150 L350,200 L250,200 Z"
                  fill="#ef4444"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <text x="300" y="180" fill="#fff" fontSize="10" textAnchor="middle">
                  Section A3
                </text>
                <text x="300" y="195" fill="#fff" fontSize="8" textAnchor="middle">
                  Low Moisture (14%)
                </text>

                {/* East Field - Mixed health with pest infestation */}
                <path
                  d="M450,100 L700,100 L700,300 L450,300 Z"
                  fill="#eab308"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="575" y="130" fill="#fff" fontSize="16" fontWeight="bold">
                  East Field
                </text>
                <text x="575" y="150" fill="#fff" fontSize="12">
                  Soybeans - 68% Healthy
                </text>

                {/* Pest infestation area in East Field */}
                <path
                  d="M500,150 L650,250 L550,275 L500,200 Z"
                  fill="#f59e0b"
                  fillOpacity="0.7"
                  stroke="#fff"
                  strokeWidth="1"
                />
                <text x="550" y="210" fill="#fff" fontSize="10" textAnchor="middle">
                  Pest Detection
                </text>

                {/* South Field - Mostly healthy */}
                <path
                  d="M100,300 L400,300 L400,450 L100,450 Z"
                  fill="#22c55e"
                  fillOpacity="0.6"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="250" y="330" fill="#fff" fontSize="16" fontWeight="bold">
                  South Field
                </text>
                <text x="250" y="350" fill="#fff" fontSize="12">
                  Wheat - 95% Healthy
                </text>

                {/* West Field - Fallow with optimal planting window */}
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
                  Optimal Planting: May 15-20
                </text>

                {/* Farm buildings */}
                <rect x="800" y="200" width="100" height="100" fill="#475569" stroke="#fff" strokeWidth="2" />
                <text x="850" y="260" fill="#fff" fontSize="14" textAnchor="middle">
                  Farm HQ
                </text>
              </svg>

              {/* Interactive tooltips for insights */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute left-[300px] top-[175px] h-6 w-6 cursor-pointer rounded-full bg-red-500 flex items-center justify-center border-2 border-white">
                      <Info className="h-3 w-3 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="font-medium">Critical: Irrigation Needed</div>
                    <p className="text-xs mt-1">
                      Soil moisture in North Field section A3 has dropped to 14%, well below the optimal range of
                      25-30%. Irrigate within 24 hours to prevent crop stress.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute left-[550px] top-[200px] h-6 w-6 cursor-pointer rounded-full bg-amber-500 flex items-center justify-center border-2 border-white">
                      <Info className="h-3 w-3 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="font-medium">Warning: Pest Infestation</div>
                    <p className="text-xs mt-1">
                      Drone imagery shows signs of potential pest infestation in the soybean section of East Field.
                      Recommend ground inspection to verify and determine appropriate treatment.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute left-[575px] top-[400px] h-6 w-6 cursor-pointer rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                      <Info className="h-3 w-3 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="font-medium">Info: Optimal Planting Window</div>
                    <p className="text-xs mt-1">
                      Based on soil conditions and weather forecast, the optimal planting window for West Field will be
                      between May 15-20. Soil temperature and moisture levels are projected to be ideal during this
                      period.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 rounded-md bg-background/90 p-3 backdrop-blur-sm">
                <div className="text-xs font-medium">Insight Types</div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Critical (Action Required)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs">Warning (Monitor Closely)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Information (Opportunity)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-slate-500"></div>
                  <span className="text-xs">Fallow/Unplanted</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="text-sm font-medium">Critical Issues</div>
                </div>
                <ul className="mt-2 text-xs space-y-1 text-muted-foreground">
                  <li>• North Field section A3: Low moisture (14%)</li>
                  <li>• Action: Irrigate within 24 hours</li>
                </ul>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <div className="text-sm font-medium">Warnings</div>
                </div>
                <ul className="mt-2 text-xs space-y-1 text-muted-foreground">
                  <li>• East Field: Pest infestation detected</li>
                  <li>• Action: Inspect and treat within 7 days</li>
                </ul>
              </div>
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="text-sm font-medium">Opportunities</div>
                </div>
                <ul className="mt-2 text-xs space-y-1 text-muted-foreground">
                  <li>• West Field: Optimal planting May 15-20</li>
                  <li>• Action: Prepare equipment and seeds</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Corn Health</div>
                <div className="mt-1 text-2xl font-bold">92%</div>
                <div className="mt-1 text-xs text-muted-foreground">+3% from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[92%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Soybean Health</div>
                <div className="mt-1 text-2xl font-bold">68%</div>
                <div className="mt-1 text-xs text-muted-foreground">-5% from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[68%] rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Wheat Health</div>
                <div className="mt-1 text-2xl font-bold">95%</div>
                <div className="mt-1 text-xs text-muted-foreground">+2% from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[95%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Overall Farm Health</div>
                <div className="mt-1 text-2xl font-bold">85%</div>
                <div className="mt-1 text-xs text-muted-foreground">+1% from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Soil Conditions</div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Average Moisture</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="font-medium">21%</div>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[21%] rounded-full bg-yellow-500"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Soil Temperature</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="font-medium">68°F</div>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[68%] rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">pH Level</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="font-medium">6.8</div>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[80%] rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Organic Matter</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="font-medium">3.2%</div>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-full w-[65%] rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Weather Impact</div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Current Temperature</div>
                    <div className="mt-1 font-medium">72°F</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Precipitation (7 days)</div>
                    <div className="mt-1 font-medium">1.2 inches</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Growing Degree Days</div>
                    <div className="mt-1 font-medium">856 (+45)</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Forecast</div>
                    <div className="mt-1 font-medium">Rain (48h)</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg p-3">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 flex items-baseline">
        <div className="text-2xl font-semibold">{value}</div>
        <div
          className={`ml-2 flex items-center text-xs font-medium ${
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
          }`}
        >
          {trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3" />}
          {trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3" />}
          {trend === "neutral" && <Minus className="mr-1 h-3 w-3" />}
          {change}
        </div>
      </div>
    </div>
  )
}

