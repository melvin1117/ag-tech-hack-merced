import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, Droplet, TreesIcon as Plant, AlertTriangle } from "lucide-react"

export function FieldStats() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="moisture">Moisture</TabsTrigger>
        <TabsTrigger value="health">Health</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Area</CardTitle>
              <Ruler className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120 acres</div>
              <p className="text-xs text-muted-foreground">4 fields monitored</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Moisture</CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21%</div>
              <p className="text-xs text-muted-foreground">-3% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
              <Plant className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good</div>
              <p className="text-xs text-muted-foreground">2 fields in good condition</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 high priority</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="moisture" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">North Field</CardTitle>
              <Droplet className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[28%] rounded-full bg-blue-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Optimal range: 25-30%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">East Field</CardTitle>
              <Droplet className="h-4 w-4 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[22%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Optimal range: 20-25%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">South Field</CardTitle>
              <Droplet className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[14%] rounded-full bg-yellow-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Optimal range: 20-25%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">West Field</CardTitle>
              <Droplet className="h-4 w-4 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[18%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Optimal range: 15-20%</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="health" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">North Field - Corn</CardTitle>
              <Plant className="h-4 w-4 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good (0.78)</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[78%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">NDVI Index: 0.78</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">East Field - Soybeans</CardTitle>
              <Plant className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Fair (0.62)</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[62%] rounded-full bg-yellow-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">NDVI Index: 0.62</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">South Field - Wheat</CardTitle>
              <Plant className="h-4 w-4 text-green-500 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good (0.75)</div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[75%] rounded-full bg-green-500"></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">NDVI Index: 0.75</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

