import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Download, TreesIcon as Plant } from "lucide-react"
import Link from "next/link"

export function FieldHeader({ id }: { id: string }) {
  // In a real app, we would fetch field data based on the ID
  const fieldData = {
    name:
      id === "north-field"
        ? "North Field"
        : id === "east-field"
          ? "East Field"
          : id === "south-field"
            ? "South Field"
            : "West Field",
    crop: id === "north-field" ? "Corn" : id === "east-field" ? "Soybeans" : id === "south-field" ? "Wheat" : "Fallow",
    lastScan: "Today at 10:32 AM",
    status: id === "south-field" ? "Warning" : id === "west-field" ? "Inactive" : "Active",
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/fields">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Fields</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{fieldData.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Plant className="h-4 w-4" />
              <span>{fieldData.crop}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last scan: {fieldData.lastScan}</span>
            </div>
            <Badge
              variant={
                fieldData.status === "Warning" ? "destructive" : fieldData.status === "Inactive" ? "outline" : "default"
              }
            >
              {fieldData.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button>Scan Now</Button>
      </div>
    </div>
  )
}

