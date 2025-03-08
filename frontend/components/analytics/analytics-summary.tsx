import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function AnalyticsSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Performance Overview</CardTitle>
        <CardDescription>Key metrics and insights from your farm operations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="season">Season</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Avg. Crop Health" value="92%" change="+2%" trend="up" />
              <MetricCard title="Soil Moisture" value="24%" change="-3%" trend="down" />
              <MetricCard title="Drone Coverage" value="85%" change="+5%" trend="up" />
              <MetricCard title="Active Alerts" value="2" change="+1" trend="up" isBad={true} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-3">
                <h4 className="font-medium mb-2">Top Insights</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500"></div>
                    <span className="text-sm">North Field section A3 requires irrigation within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Potential pest infestation detected in East Field soybeans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Corn in North Field showing excellent health metrics</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border p-3">
                <h4 className="font-medium mb-2">Weather Impact</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Current Temperature</div>
                    <div className="text-lg font-medium">72°F</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Precipitation (24h)</div>
                    <div className="text-lg font-medium">0.0 in</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Wind</div>
                    <div className="text-lg font-medium">8 mph NW</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Forecast</div>
                    <div className="text-lg font-medium">Rain (48h)</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="week" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Avg. Crop Health" value="89%" change="+4%" trend="up" />
              <MetricCard title="Soil Moisture" value="26%" change="+2%" trend="up" />
              <MetricCard title="Drone Coverage" value="92%" change="+8%" trend="up" />
              <MetricCard title="Active Alerts" value="5" change="-2" trend="down" isBad={false} />
            </div>
            <div className="mt-4 rounded-lg border p-3">
              <h4 className="font-medium mb-2">Weekly Summary</h4>
              <p className="text-sm text-muted-foreground">
                This week showed overall improvement in farm health metrics. Drone coverage increased by 8% due to the
                addition of scheduled flights. Soil moisture levels have stabilized following irrigation in key areas.
                There was a decrease in active alerts as previous issues were addressed.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="month" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Avg. Crop Health" value="87%" change="+6%" trend="up" />
              <MetricCard title="Soil Moisture" value="25%" change="0%" trend="neutral" />
              <MetricCard title="Drone Coverage" value="95%" change="+15%" trend="up" />
              <MetricCard title="Total Alerts" value="24" change="-5" trend="down" isBad={false} />
            </div>
            <div className="mt-4 rounded-lg border p-3">
              <h4 className="font-medium mb-2">Monthly Summary</h4>
              <p className="text-sm text-muted-foreground">
                This month has shown significant improvement in overall farm health. The implementation of targeted
                irrigation and pest management strategies has resulted in a 6% increase in crop health. Drone coverage
                has reached near-complete levels at 95%, providing comprehensive monitoring of all fields.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="season" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard title="Yield Forecast" value="+12%" change="+3%" trend="up" />
              <MetricCard title="Resource Usage" value="-8%" change="-2%" trend="down" isBad={false} />
              <MetricCard title="Crop Health Avg" value="90%" change="+5%" trend="up" />
              <MetricCard title="ROI Forecast" value="+15%" change="+2%" trend="up" />
            </div>
            <div className="mt-4 rounded-lg border p-3">
              <h4 className="font-medium mb-2">Seasonal Outlook</h4>
              <p className="text-sm text-muted-foreground">
                The current growing season is tracking significantly better than the previous year. Yield forecasts
                indicate a 12% increase over last season, while resource usage (water, fertilizer, pesticides) has
                decreased by 8% due to precision agriculture techniques. The return on investment is projected to
                increase by 15% compared to last season.
              </p>
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
  isBad?: boolean
}

function MetricCard({ title, value, change, trend, isBad = false }: MetricCardProps) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 flex items-baseline">
        <div className="text-2xl font-semibold">{value}</div>
        <div
          className={`ml-2 flex items-center text-xs font-medium ${
            trend === "up"
              ? isBad
                ? "text-red-500"
                : "text-green-500"
              : trend === "down"
                ? isBad
                  ? "text-green-500"
                  : "text-red-500"
                : "text-gray-500"
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

