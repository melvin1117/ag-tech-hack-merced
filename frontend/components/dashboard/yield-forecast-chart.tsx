import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface YieldForecastChartProps {
  data: {
    date: string
    yield: number
  }[]
}

const YieldForecastChart: React.FC<YieldForecastChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yield Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for chart implementation. Replace with actual charting library. */}
        <div>
          {data.map((item) => (
            <div key={item.date}>
              {item.date}: {item.yield}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default YieldForecastChart

