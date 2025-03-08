import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Droplet, Bug, Sprout, CloudSun } from "lucide-react"

export function InsightsList() {
  const insights = [
    {
      id: "insight-1",
      title: "Low Soil Moisture in North Field",
      description:
        "Soil moisture levels in North Field section A3 have dropped below optimal levels. Consider irrigation within the next 24 hours to prevent crop stress.",
      category: "Irrigation",
      priority: "High",
      date: "Today at 10:32 AM",
      icon: Droplet,
      iconColor: "text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "insight-2",
      title: "Potential Pest Infestation in East Field",
      description:
        "Drone imagery shows signs of potential pest infestation in the soybean section of East Field. Recommend ground inspection to verify and determine appropriate treatment.",
      category: "Pest Control",
      priority: "Medium",
      date: "Today at 9:15 AM",
      icon: Bug,
      iconColor: "text-amber-500 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900",
    },
    {
      id: "insight-3",
      title: "Optimal Planting Window for West Field",
      description:
        "Based on soil conditions and weather forecast, the optimal planting window for West Field will be between May 15-20. Soil temperature and moisture levels are projected to be ideal during this period.",
      category: "Planning",
      priority: "Low",
      date: "Yesterday at 3:45 PM",
      icon: Sprout,
      iconColor: "text-green-500 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900",
    },
    {
      id: "insight-4",
      title: "Weather Alert: Heavy Rain Expected",
      description:
        "Weather forecast indicates heavy rainfall (1.5-2 inches) expected in the next 48 hours. Consider postponing scheduled fertilizer application to avoid runoff and nutrient loss.",
      category: "Weather",
      priority: "Medium",
      date: "Yesterday at 2:10 PM",
      icon: CloudSun,
      iconColor: "text-purple-500 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Insights</CardTitle>
        <CardDescription>AI-generated insights and recommendations based on farm data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className={`rounded-full ${insight.iconBg} p-2`}>
                <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.date}</p>
                  </div>
                  <Badge
                    variant={
                      insight.priority === "High"
                        ? "destructive"
                        : insight.priority === "Medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{insight.category}</Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span>View Details</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

