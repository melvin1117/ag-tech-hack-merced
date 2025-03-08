import type React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SoilMoistureData {
  time: string
  moisture: number
}

interface SoilMoistureChartProps {
  data: SoilMoistureData[]
}

const SoilMoistureChart: React.FC<SoilMoistureChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-popover text-popover-foreground">
          <CardHeader>
            <CardTitle className="text-sm">{label}</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-xs">Moisture: {payload[0].value}%</p>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Moisture</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="moisture" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SoilMoistureChart

