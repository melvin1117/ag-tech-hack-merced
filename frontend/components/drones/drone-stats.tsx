import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Battery, Clock, Ruler, Wrench } from "lucide-react"

export function DroneStats() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Drones</CardTitle>
              <Ruler className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 active, 2 inactive</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flight Time Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3h 45m</div>
              <p className="text-xs text-muted-foreground">+1h 15m from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Battery Level</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">71%</div>
              <p className="text-xs text-muted-foreground">2 drones need charging</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Drone #3 in 2 days</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="status" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drone #1</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Flying</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[78%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Battery: 78% • North Field</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drone #2</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Scanning</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[64%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Battery: 64% • East Field</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drone #3</CardTitle>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Charging</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[42%] rounded-full bg-yellow-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Battery: 42% • Home Base</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drone #4</CardTitle>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Idle</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[100%] rounded-full bg-blue-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Battery: 100% • Home Base</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="performance" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Area Scanned Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87 acres</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[72%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">72% of total farm area</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 GB</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[64%] rounded-full bg-blue-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">1,240 images, 8 sensor datasets</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Battery Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[92%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

