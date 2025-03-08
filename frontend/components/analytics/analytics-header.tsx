import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function AnalyticsHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="soil">Soil</TabsTrigger>
            <TabsTrigger value="drones">Drones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-4 md:grid-cols-4">
              <MetricCard title="Average Crop Health" value="85%" change="+2%" trend="up" />
              <MetricCard title="Average Soil Moisture" value="21%" change="-3%" trend="down" />
              <MetricCard title="Yield Forecast" value="+8%" change="+1%" trend="up" />
              <MetricCard title="Drone Flight Hours" value="128h" change="0%" trend="neutral" />
            </div>
          </TabsContent>

          <TabsContent value="crops" className="pt-4">
            <div className="grid gap-4 md:grid-cols-4">
              <MetricCard title="Corn Health" value="92%" change="+3%" trend="up" />
              <MetricCard title="Soybean Health" value="68%" change="-5%" trend="down" />
              <MetricCard title="Wheat Health" value="95%" change="+2%" trend="up" />
              <MetricCard title="Disease Detection" value="2 fields" change="+1" trend="down" />
            </div>
          </TabsContent>

          <TabsContent value="soil" className="pt-4">
            <div className="grid gap-4 md:grid-cols-4">
              <MetricCard title="Nitrogen (N) Level" value="Medium" change="-10%" trend="down" />
              <MetricCard title="Phosphorus (P) Level" value="High" change="+15%" trend="up" />
              <MetricCard title="Potassium (K) Level" value="Low" change="-25%" trend="down" />
              <MetricCard title="Soil pH" value="6.8" change="+0.2" trend="up" />
            </div>
          </TabsContent>

          <TabsContent value="drones" className="pt-4">
            <div className="grid gap-4 md:grid-cols-4">
              <MetricCard title="Active Drones" value="2/4" change="0" trend="neutral" />
              <MetricCard title="Area Scanned" value="87 acres" change="+12" trend="up" />
              <MetricCard title="Battery Efficiency" value="92%" change="+5%" trend="up" />
              <MetricCard title="Data Collected" value="3.2 GB" change="+0.8" trend="up" />
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

