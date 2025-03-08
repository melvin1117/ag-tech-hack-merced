import type React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FieldComparisonChartProps {
  data: {
    name: string
    value1: number
    value2: number
  }[]
  title: string
  value1Label: string
  value2Label: string
}

const FieldComparisonChart: React.FC<FieldComparisonChartProps> = ({ data, title, value1Label, value2Label }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value1" fill="#8884d8" name={value1Label} />
            <Bar dataKey="value2" fill="#82ca9d" name={value2Label} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default FieldComparisonChart

