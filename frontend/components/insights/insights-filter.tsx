"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

export function InsightsFilter() {
  const [date, setDate] = useState<Date>()
  const [categories, setCategories] = useState({
    irrigation: true,
    pestControl: true,
    planning: true,
    weather: true,
  })

  const [priorities, setPriorities] = useState({
    high: true,
    medium: true,
    low: true,
  })

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarIcon className="h-4 w-4" />
            {date ? format(date, "PPP") : "Date Range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={categories.irrigation}
            onCheckedChange={(checked) => setCategories({ ...categories, irrigation: !!checked })}
          >
            Irrigation
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={categories.pestControl}
            onCheckedChange={(checked) => setCategories({ ...categories, pestControl: !!checked })}
          >
            Pest Control
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={categories.planning}
            onCheckedChange={(checked) => setCategories({ ...categories, planning: !!checked })}
          >
            Planning
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={categories.weather}
            onCheckedChange={(checked) => setCategories({ ...categories, weather: !!checked })}
          >
            Weather
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={priorities.high}
            onCheckedChange={(checked) => setPriorities({ ...priorities, high: !!checked })}
          >
            High
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={priorities.medium}
            onCheckedChange={(checked) => setPriorities({ ...priorities, medium: !!checked })}
          >
            Medium
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={priorities.low}
            onCheckedChange={(checked) => setPriorities({ ...priorities, low: !!checked })}
          >
            Low
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

