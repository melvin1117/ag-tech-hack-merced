import type React from "react"
import { Line } from "recharts"
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NPKData {
  time: string
  nitrogen: number
  phosphorus: number
  potassium: number
}

interface NPKSensorChartProps {
  data: NPKData[]
}

const NPKSensorChart: React.FC<NPKSensorChartProps> = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>NPK Sensor Data</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="nitrogen" stroke="#8884d8" name="Nitrogen" />
            <Line type="monotone" dataKey="phosphorus" stroke="#82ca9d" name="Phosphorus" />
            <Line type="monotone" dataKey="potassium" stroke="#ffc658" name="Potassium" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default NPKSensorChart

