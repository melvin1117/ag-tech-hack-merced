"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  type: "critical" | "warning" | "info" | "success"
  isRead: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Critical Soil Moisture",
    description: "North Field section A3 requires immediate irrigation",
    timestamp: "10 min ago",
    type: "critical",
    isRead: false,
  },
  {
    id: "2",
    title: "Pest Detection",
    description: "Potential pest activity in East Field soybeans",
    timestamp: "45 min ago",
    type: "warning",
    isRead: false,
  },
  {
    id: "3",
    title: "Weather Alert",
    description: "Heavy rain forecast for tomorrow",
    timestamp: "2 hours ago",
    type: "warning",
    isRead: true,
  },
  {
    id: "4",
    title: "Optimal Planting Window",
    description: "West Field conditions optimal May 15-20",
    timestamp: "Yesterday",
    type: "info",
    isRead: true,
  },
  {
    id: "5",
    title: "Drone Maintenance",
    description: "Scheduled maintenance for Drone 4 completed",
    timestamp: "2 days ago",
    type: "success",
    isRead: true,
  },
]

export function NotificationBell() {
  const [notifs, setNotifs] = useState<Notification[]>(notifications)

  const unreadCount = notifs.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifs((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifs.length > 0 ? (
            <div className="flex flex-col gap-1 p-1">
              {notifs.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex cursor-pointer gap-3 rounded-md p-2 ${!notification.isRead ? "bg-muted/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-0.5">
                    {notification.type === "critical" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {notification.type === "warning" && <AlertCircle className="h-4 w-4 text-amber-500" />}
                    {notification.type === "info" && <Info className="h-4 w-4 text-blue-500" />}
                    {notification.type === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.isRead && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">No new notifications</div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/analytics" className="cursor-pointer justify-center text-center text-sm font-medium">
            View all notifications
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

