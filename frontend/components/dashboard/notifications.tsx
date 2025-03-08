"use client"

import { useState } from "react"
import { Bell, Droplet, Bug, Thermometer, AlertTriangle, CloudRain, WormIcon as Virus, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
  // Update the notification count to match the number of alerts
  const [notificationCount, setNotificationCount] = useState(6)

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  // Alert data that would normally be fetched from an API
  const alerts = [
    {
      id: 1,
      title: "Irrigate North Field Now",
      description: "Section A3 moisture critically low (14%)",
      icon: Droplet,
      iconColor: "text-red-400",
      iconBg: "bg-red-900",
      priority: "High Priority",
      time: "10 minutes ago",
      action: "Schedule Irrigation",
    },
    {
      id: 2,
      title: "Pest Alert: East Field",
      description: "Soybean section requires inspection",
      icon: Bug,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-900",
      priority: "Medium Priority",
      time: "1 hour ago",
      action: "View Details",
    },
    {
      id: 3,
      title: "Apply Fungicide: East Field",
      description: "Soybean rust affecting 22% of crop",
      icon: Virus,
      iconColor: "text-red-400",
      iconBg: "bg-red-900",
      priority: "High Priority",
      time: "Yesterday",
      action: "Schedule Treatment",
    },
    {
      id: 4,
      title: "Weather Alert: Heavy Rain",
      description: "1.5-2.0 inches expected in 48 hours",
      icon: CloudRain,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-900",
      priority: "Medium Priority",
      time: "Yesterday",
      action: "View Forecast",
    },
    {
      id: 5,
      title: "Heat Stress: South Field",
      description: "Wheat showing early stress signs",
      icon: Thermometer,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-900",
      priority: "Medium Priority",
      time: "3 hours ago",
      action: "Monitor",
    },
    {
      id: 6,
      title: "Planting Window: West Field",
      description: "Optimal conditions May 15-20",
      icon: Sprout,
      iconColor: "text-green-400",
      iconBg: "bg-green-900",
      priority: "Information",
      time: "5 hours ago",
      action: "Plan Schedule",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-haspopup="true" aria-expanded="false">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {notificationCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96" sideOffset={4} collisionPadding={8}>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Alerts & Notifications</span>
          {notificationCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearNotifications}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[calc(100vh-10rem)] overflow-auto">
          {alerts.map((alert) => (
            <DropdownMenuItem
              key={alert.id}
              className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-muted"
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex w-full items-start gap-2">
                <div className={`rounded-full ${alert.iconBg} p-1 mt-0.5`}>
                  <alert.icon className={`h-4 w-4 ${alert.iconColor}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between w-full">
                    <div className="font-medium">{alert.title}</div>
                    <Badge
                      variant={
                        alert.priority === "High Priority"
                          ? "destructive"
                          : alert.priority === "Medium Priority"
                            ? "default"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{alert.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          {alerts.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              <AlertTriangle className="mx-auto h-6 w-6 mb-2" />
              <p>No alerts at this time</p>
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-center text-sm">View all alerts</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

