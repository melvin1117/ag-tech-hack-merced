import type React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherData {
  time: string
  temperature: number
  humidity: number
}

interface WeatherDataChartProps {
  data: WeatherData[]
}

const WeatherDataChart: React.FC<WeatherDataChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-popover text-popover-foreground">
          <CardContent className="p-2">
            <p className="label">{`Time: ${label}`}</p>
            <p className="desc">{`Temperature: ${payload[0].value}°C`}</p>
            <p className="desc">{`Humidity: ${payload[1].value}%`}</p>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Data</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              yAxisId="temperature"
              label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              label={{ value: "Humidity (%)", angle: 90, position: "insideRight", style: { textAnchor: "middle" } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="temperature" type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
            <Area yAxisId="humidity" type="monotone" dataKey="humidity" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default WeatherDataChart

