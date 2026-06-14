"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface FilterBarProps {
  search: string
  dateFrom: string
  dateTo: string
  status: string
  onSearchChange: (val: string) => void
  onDateFromChange: (val: string) => void
  onDateToChange: (val: string) => void
  onStatusChange: (val: string) => void
}

export function FilterBar({
  search,
  dateFrom,
  dateTo,
  status,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Search</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            placeholder="Name, email, or ID..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-56 pl-8"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">From</label>
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="h-9 w-40"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">To</label>
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="h-9 w-40"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
