"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="drones">Drones</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      {/* General Settings */}
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your general application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="farm-name">Farm Name</Label>
              <Input id="farm-name" defaultValue="Green Valley Farms" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="america-chicago">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-chicago">America/Chicago</SelectItem>
                  <SelectItem value="america-new_york">America/New York</SelectItem>
                  <SelectItem value="america-los_angeles">America/Los Angeles</SelectItem>
                  <SelectItem value="europe-london">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="units">Measurement Units</Label>
              <Select defaultValue="imperial">
                <SelectTrigger id="units">
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imperial">Imperial (°F, in, ft)</SelectItem>
                  <SelectItem value="metric">Metric (°C, cm, m)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <div className="text-sm text-muted-foreground">Enable dark mode for the application</div>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Drone Settings */}
      <TabsContent value="drones">
        <Card>
          <CardHeader>
            <CardTitle>Drone Settings</CardTitle>
            <CardDescription>Configure your drone fleet settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="flight-altitude">Default Flight Altitude (ft)</Label>
              <Input id="flight-altitude" type="number" defaultValue="400" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flight-speed">Default Flight Speed (mph)</Label>
              <Input id="flight-speed" type="number" defaultValue="15" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="battery-threshold">Low Battery Threshold (%)</Label>
              <Input id="battery-threshold" type="number" defaultValue="20" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-return">Auto Return on Low Battery</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically return drones to home when battery is low
                </div>
              </div>
              <Switch id="auto-return" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="collision-avoidance">Collision Avoidance</Label>
                <div className="text-sm text-muted-foreground">Enable collision avoidance systems</div>
              </div>
              <Switch id="collision-avoidance" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Notification Settings */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <div className="text-sm text-muted-foreground">Receive notifications via email</div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <div className="text-sm text-muted-foreground">Receive notifications via SMS</div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <div className="text-sm text-muted-foreground">Receive push notifications in browser</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Notification Types</Label>

              <div className="flex items-center justify-between">
                <div className="text-sm">Drone Status Alerts</div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">Field Health Alerts</div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">Weather Alerts</div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">System Updates</div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Account Settings */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Update Account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

