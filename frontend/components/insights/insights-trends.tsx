import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InsightsTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Insights Summary</CardTitle>
        <CardDescription>Key metrics and trends across your farm</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="soil">Soil</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Active Alerts</div>
                <div className="mt-1 text-2xl font-bold">3</div>
                <div className="mt-1 text-xs text-muted-foreground">1 high priority</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-1/3 rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Crop Health</div>
                <div className="mt-1 text-2xl font-bold">85%</div>
                <div className="mt-1 text-xs text-muted-foreground">+2% from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Soil Moisture</div>
                <div className="mt-1 text-2xl font-bold">21%</div>
                <div className="mt-1 text-xs text-muted-foreground">-3% from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[21%] rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Yield Forecast</div>
                <div className="mt-1 text-2xl font-bold">+8%</div>
                <div className="mt-1 text-xs text-muted-foreground">vs. last season</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[58%] rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border p-4">
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
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="text-sm">Weather forecast: Heavy rainfall expected in next 48 hours</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="crops" className="pt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Corn (North Field)</div>
                <div className="mt-1 text-2xl font-bold">Good</div>
                <div className="mt-1 text-xs text-muted-foreground">NDVI: 0.78</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[78%] rounded-full bg-green-500"></div>
                </div>
                <div className="mt-2 text-xs">Est. Yield: 168 bu/acre (+12%)</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Soybeans (East Field)</div>
                <div className="mt-1 text-2xl font-bold">Fair</div>
                <div className="mt-1 text-xs text-muted-foreground">NDVI: 0.62</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-yellow-500"></div>
                </div>
                <div className="mt-2 text-xs">Est. Yield: 42 bu/acre (-3%)</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Wheat (South Field)</div>
                <div className="mt-1 text-2xl font-bold">Good</div>
                <div className="mt-1 text-xs text-muted-foreground">NDVI: 0.75</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[75%] rounded-full bg-green-500"></div>
                </div>
                <div className="mt-2 text-xs">Est. Yield: 58 bu/acre (+8%)</div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border p-4">
              <div className="text-sm font-medium">Crop Health Insights</div>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                  <div className="text-sm">Soybean rust detected in East Field (22% of field affected)</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="text-sm">Corn in North Field showing excellent growth, currently in R3 stage</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="text-sm">Early signs of powdery mildew in South Field wheat (5% affected)</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="soil" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Average Moisture</div>
                <div className="mt-1 text-2xl font-bold">21%</div>
                <div className="mt-1 text-xs text-muted-foreground">Optimal: 25-30%</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[21%] rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Soil Temperature</div>
                <div className="mt-1 text-2xl font-bold">68°F</div>
                <div className="mt-1 text-xs text-muted-foreground">+2°F from last week</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[68%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">pH Level</div>
                <div className="mt-1 text-2xl font-bold">6.8</div>
                <div className="mt-1 text-xs text-muted-foreground">Optimal: 6.5-7.0</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[80%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Organic Matter</div>
                <div className="mt-1 text-2xl font-bold">3.2%</div>
                <div className="mt-1 text-xs text-muted-foreground">+0.2% from last year</div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[65%] rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border p-4">
              <div className="text-sm font-medium">Soil Insights</div>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="text-sm">North Field section A3 moisture at 14% (critically low)</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="text-sm">East Field showing nitrogen deficiency in southeastern section</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="text-sm">South Field soil conditions optimal for current crop stage</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="weather" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Current Conditions</div>
                <div className="mt-1 text-2xl font-bold">72°F</div>
                <div className="mt-1 text-xs text-muted-foreground">Partly Cloudy</div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span>Humidity: 32%</span>
                  <span>Wind: 8 mph</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Precipitation</div>
                <div className="mt-1 text-2xl font-bold">1.8"</div>
                <div className="mt-1 text-xs text-muted-foreground">Last 7 days</div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span>YTD: 12.4"</span>
                  <span>vs Normal: +0.8"</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Growing Degree Days</div>
                <div className="mt-1 text-2xl font-bold">856</div>
                <div className="mt-1 text-xs text-muted-foreground">Season to date</div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span>vs Normal: +45</span>
                  <span>Last Year: 810</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Forecast</div>
                <div className="mt-1 text-2xl font-bold">Rain</div>
                <div className="mt-1 text-xs text-muted-foreground">Next 48 hours</div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span>Amount: 1.5-2.0"</span>
                  <span>Chance: 90%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border p-4">
              <div className="text-sm font-medium">Weather Insights</div>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="text-sm">Heavy rainfall expected in next 48 hours (1.5-2.0 inches)</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="text-sm">Consider postponing scheduled fertilizer application</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="text-sm">Growing degree days are 45 units ahead of normal</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="text-sm">Extended forecast: Warming trend expected next week</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

