import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CropHealth({ id }: { id: string }) {
  // In a real app, we would fetch crop health data based on the ID
  const cropData = {
    crop: id === "north-field" ? "Corn" : id === "east-field" ? "Soybeans" : id === "south-field" ? "Wheat" : "Fallow",
    ndvi: id === "north-field" ? "0.78" : id === "east-field" ? "0.62" : id === "south-field" ? "0.75" : "N/A",
    status: id === "north-field" ? "Good" : id === "east-field" ? "Fair" : id === "south-field" ? "Good" : "N/A",
    stress: id === "east-field" ? "Medium" : "Low",
    pests: id === "east-field" ? "Detected" : "None",
    disease: "None",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Crop Health</CardTitle>
        <CardDescription>{cropData.crop} health indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">NDVI Index</div>
            <div className="text-2xl font-bold">{cropData.ndvi}</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${
                  Number.parseFloat(cropData.ndvi) > 0.7
                    ? "bg-green-500"
                    : Number.parseFloat(cropData.ndvi) > 0.5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${Number.parseFloat(cropData.ndvi) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Overall Status</div>
            <div className="text-2xl font-bold">{cropData.status}</div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${
                  cropData.status === "Good"
                    ? "bg-green-500"
                    : cropData.status === "Fair"
                      ? "bg-yellow-500"
                      : cropData.status === "Poor"
                        ? "bg-red-500"
                        : "bg-gray-500"
                }`}
                style={{
                  width:
                    cropData.status === "Good"
                      ? "80%"
                      : cropData.status === "Fair"
                        ? "60%"
                        : cropData.status === "Poor"
                          ? "30%"
                          : "0%",
                }}
              ></div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-md border p-2">
              <div className="text-muted-foreground">Stress Level</div>
              <div className="mt-1 font-medium">{cropData.stress}</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-muted-foreground">Pest Detection</div>
              <div className="mt-1 font-medium">{cropData.pests}</div>
            </div>
            <div className="rounded-md border p-2">
              <div className="text-muted-foreground">Disease</div>
              <div className="mt-1 font-medium">{cropData.disease}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

