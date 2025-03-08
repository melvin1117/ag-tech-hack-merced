"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Filter } from "lucide-react"
import { format, subDays, subMonths } from "date-fns"

export function AnalyticsFilter() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState("30d")

  const handleQuickSelect = (range: string) => {
    setDateRange(range)
    const today = new Date()

    switch (range) {
      case "7d":
        setDate(subDays(today, 7))
        break
      case "30d":
        setDate(subDays(today, 30))
        break
      case "90d":
        setDate(subDays(today, 90))
        break
      case "6m":
        setDate(subMonths(today, 6))
        break
      case "1y":
        setDate(subMonths(today, 12))
        break
      default:
        setDate(today)
    }
  }

  return (
    <div className="flex gap-2">
      <Select value={dateRange} onValueChange={handleQuickSelect}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
          <SelectItem value="6m">Last 6 months</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarIcon className="h-4 w-4" />
            {date ? format(date, "MMM d, yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="sm" className="gap-1">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
    </div>
  )
}

