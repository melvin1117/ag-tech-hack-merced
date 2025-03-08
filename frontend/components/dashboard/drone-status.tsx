"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DroneStatus() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Drone Fleet</CardTitle>
          <Badge variant="outline" className="bg-green-900 text-green-300">
            2 Active
          </Badge>
        </div>
        <CardDescription>Current status of your drones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Drone #1</div>
              <Badge>Flying</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Battery className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Battery</span>
                </div>
                <span className="font-medium">78%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[78%] rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Drone #2</div>
              <Badge>Scanning</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Battery className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Battery</span>
                </div>
                <span className="font-medium">64%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[64%] rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Drone #3</div>
              <Badge variant="outline">Charging</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Battery className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Battery</span>
                </div>
                <span className="font-medium">42%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full w-[42%] rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            View All Drones
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

