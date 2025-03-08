import type React from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SensorData {
  timestamp: string
  temperature: number
  humidity: number
  pressure: number
}

interface DroneSensorCorrelationProps {
  data: SensorData[]
}

const DroneSensorCorrelation: React.FC<DroneSensorCorrelationProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-2 bg-white border rounded shadow-md">
          <CardContent>
            <p className="font-bold">{label}</p>
            <p className="text-gray-700">Temperature: {payload[0].value}°C</p>
            <p className="text-gray-700">Humidity: {payload[1].value}%</p>
            <p className="text-gray-700">Pressure: {payload[2].value} hPa</p>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drone Sensor Correlation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
            <Line type="monotone" dataKey="pressure" stroke="#ffc658" name="Pressure (hPa)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DroneSensorCorrelation

