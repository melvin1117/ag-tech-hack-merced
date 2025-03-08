import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SoilAnalysis({ id }: { id: string }) {
  // In a real app, we would fetch soil data based on the ID
  const soilData = {
    moisture: id === "north-field" ? "28%" : id === "east-field" ? "22%" : id === "south-field" ? "14%" : "18%",
    temperature: "68°F",
    ph: "6.8",
    nitrogen: "Medium",
    phosphorus: "High",
    potassium: "Medium",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Soil Analysis</CardTitle>
        <CardDescription>Latest soil measurements from drone sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Moisture</div>
            <div className="text-2xl font-bold">{soilData.moisture}</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full rounded-full bg-blue-500" style={{ width: soilData.moisture }}></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Temperature</div>
            <div className="text-2xl font-bold">{soilData.temperature}</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-orange-500"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">pH Level</div>
            <div className="text-2xl font-bold">{soilData.ph}</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Nutrients</div>
            <div className="grid grid-cols-3 gap-1 text-center text-xs">
              <div className="rounded-md bg-blue-950 p-1">
                <div>N</div>
                <div className="font-medium">{soilData.nitrogen}</div>
              </div>
              <div className="rounded-md bg-green-950 p-1">
                <div>P</div>
                <div className="font-medium">{soilData.phosphorus}</div>
              </div>
              <div className="rounded-md bg-purple-950 p-1">
                <div>K</div>
                <div className="font-medium">{soilData.potassium}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

