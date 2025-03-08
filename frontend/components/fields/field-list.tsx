import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Droplet, TreesIcon as Plant, Ruler } from "lucide-react"
import Link from "next/link"

export function FieldList() {
  const fields = [
    {
      id: "north-field",
      name: "North Field",
      crop: "Corn",
      size: "45 acres",
      moisture: "28%",
      health: "Good",
      status: "Active",
    },
    {
      id: "east-field",
      name: "East Field",
      crop: "Soybeans",
      size: "32 acres",
      moisture: "22%",
      health: "Fair",
      status: "Active",
    },
    {
      id: "south-field",
      name: "South Field",
      crop: "Wheat",
      size: "28 acres",
      moisture: "14%",
      health: "Good",
      status: "Warning",
    },
    {
      id: "west-field",
      name: "West Field",
      crop: "Fallow",
      size: "15 acres",
      moisture: "18%",
      health: "N/A",
      status: "Inactive",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Fields</CardTitle>
        <CardDescription>Manage and monitor all your agricultural fields</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center justify-between rounded-lg border p-4">
              <div className="grid gap-1">
                <div className="font-medium">{field.name}</div>
                <div className="text-sm text-muted-foreground">{field.crop}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="hidden md:flex items-center gap-1">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span>{field.size}</span>
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <Droplet className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span>{field.moisture}</span>
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <Plant className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>{field.health}</span>
                </div>
                <Badge
                  variant={
                    field.status === "Warning" ? "destructive" : field.status === "Inactive" ? "outline" : "default"
                  }
                >
                  {field.status}
                </Badge>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/fields/${field.id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">View {field.name}</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

