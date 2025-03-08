import { Leaf, Droplet, Map, BarChart3, DrillIcon as Drone, CloudSun } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transform Your Farming</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines drone technology with advanced analytics to provide actionable insights for your
              farm.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold">Crop Health Monitoring</h3>
            <p className="text-sm text-muted-foreground text-center">
              Track crop health with multispectral imaging to detect issues before they become visible.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Soil Moisture Analysis</h3>
            <p className="text-sm text-muted-foreground text-center">
              Identify dry areas and optimize irrigation to save water and improve crop yields.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900">
              <Map className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold">Land Mapping</h3>
            <p className="text-sm text-muted-foreground text-center">
              Create detailed maps of your land showing arable areas, soil types, and topography.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Yield Prediction</h3>
            <p className="text-sm text-muted-foreground text-center">
              Use AI to predict crop yields based on current conditions and historical data.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900">
              <Drone className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold">Drone Fleet Management</h3>
            <p className="text-sm text-muted-foreground text-center">
              Manage multiple drones, schedule flights, and automate data collection.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
              <CloudSun className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold">Weather Integration</h3>
            <p className="text-sm text-muted-foreground text-center">
              Incorporate weather forecasts to plan optimal planting and harvesting times.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

