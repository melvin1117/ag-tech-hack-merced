"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Info } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

// Sample data for crop health over time
const cropHealthData = [
  { date: "Jan", corn: 0.72, soybeans: 0.65, wheat: 0.7 },
  { date: "Feb", corn: 0.74, soybeans: 0.63, wheat: 0.72 },
  { date: "Mar", corn: 0.75, soybeans: 0.62, wheat: 0.73 },
  { date: "Apr", corn: 0.78, soybeans: 0.6, wheat: 0.75 },
  { date: "May", corn: 0.8, soybeans: 0.58, wheat: 0.78 },
  { date: "Jun", corn: 0.82, soybeans: 0.62, wheat: 0.8 },
  { date: "Jul", corn: 0.85, soybeans: 0.65, wheat: 0.82 },
  { date: "Aug", corn: 0.88, soybeans: 0.68, wheat: 0.85 },
  { date: "Sep", corn: 0.9, soybeans: 0.7, wheat: 0.88 },
  { date: "Oct", corn: 0.92, soybeans: 0.68, wheat: 0.9 },
  { date: "Nov", corn: 0.9, soybeans: 0.65, wheat: 0.92 },
  { date: "Dec", corn: 0.88, soybeans: 0.62, wheat: 0.95 },
]

export function CropHealthChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle>Crop Health Trends</CardTitle>
          <CardDescription>NDVI index over time by crop type</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Crops</TabsTrigger>
            <TabsTrigger value="corn">Corn</TabsTrigger>
            <TabsTrigger value="soybeans">Soybeans</TabsTrigger>
            <TabsTrigger value="wheat">Wheat</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-4">
            <ChartContainer
              config={{
                corn: {
                  label: "Corn",
                  color: "hsl(var(--chart-1))",
                },
                soybeans: {
                  label: "Soybeans",
                  color: "hsl(var(--chart-2))",
                },
                wheat: {
                  label: "Wheat",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropHealthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.5, 1]} tickFormatter={(value) => value.toFixed(1)} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="corn"
                    stroke="var(--color-corn)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="soybeans"
                    stroke="var(--color-soybeans)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wheat"
                    stroke="var(--color-wheat)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
              <div className="rounded-md border p-2">
                <div className="font-medium">Corn Health</div>
                <div className="mt-1 text-lg text-green-600 dark:text-green-400">0.92</div>
                <div className="text-muted-foreground">+0.04 from last month</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Soybean Health</div>
                <div className="mt-1 text-lg text-yellow-600 dark:text-yellow-400">0.68</div>
                <div className="text-muted-foreground">-0.02 from last month</div>
              </div>
              <div className="rounded-md border p-2">
                <div className="font-medium">Wheat Health</div>
                <div className="mt-1 text-lg text-green-600 dark:text-green-400">0.95</div>
                <div className="text-muted-foreground">+0.03 from last month</div>
              </div>
            </div>
          </TabsContent>

          {/* Similar content for other tabs, simplified for brevity */}
          <TabsContent value="corn" className="pt-4">
            <ChartContainer
              config={{
                corn: {
                  label: "Corn",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropHealthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.5, 1]} tickFormatter={(value) => value.toFixed(1)} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="corn"
                    stroke="var(--color-corn)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="soybeans" className="pt-4">
            {/* Similar chart for soybeans */}
          </TabsContent>

          <TabsContent value="wheat" className="pt-4">
            {/* Similar chart for wheat */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

