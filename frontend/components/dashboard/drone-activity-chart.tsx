import type React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DroneActivityChartProps {
  data: {
    time: string
    activeDrones: number
  }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-popover text-popover-foreground">
        <CardContent className="p-2">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </CardContent>
      </Card>
    )
  }

  return null
}

const DroneActivityChart: React.FC<DroneActivityChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drone Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="activeDrones" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DroneActivityChart

