"use client"

import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react"

interface Stats {
  total: number
  pending: number
  confirmed: number
  cancelled: number
  completed: number
  todayCount: number
}

const cards = [
  {
    label: "Total Reservations",
    key: "total" as const,
    icon: CalendarDays,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    label: "Pending",
    key: "pending" as const,
    icon: Clock,
    color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    label: "Confirmed",
    key: "confirmed" as const,
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    label: "Cancelled",
    key: "cancelled" as const,
    icon: XCircle,
    color: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    label: "Completed",
    key: "completed" as const,
    icon: CheckCircle2,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    label: "Today",
    key: "todayCount" as const,
    icon: CalendarDays,
    color: "text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300",
  },
]

export function AnalyticsCards({ stats }: { stats: Stats | null }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon
        const value = stats ? stats[card.key] : "—"
        return (
          <div
            key={card.key}
            className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{card.label}</p>
              <div className={`rounded-xl p-2 ${card.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
              {value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
