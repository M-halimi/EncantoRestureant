"use client"

import { StatusBadge } from "./status-badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Trash2 } from "lucide-react"

interface Reservation {
  id: string
  name: string
  email: string | null
  phone: string
  guests: number
  date: string
  time: string
  message: string | null
  status: string
  createdAt: string
}

interface ReservationTableProps {
  reservations: Reservation[]
  onStatusChange: (id: string, status: string) => void
  onViewDetails: (reservation: Reservation) => void
  onDelete: (id: string) => void
}

const statuses = ["pending", "confirmed", "cancelled", "completed"]

export function ReservationTable({ reservations, onStatusChange, onViewDetails, onDelete }: ReservationTableProps) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 dark:border-zinc-700">
        <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">No reservations found</p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          Try adjusting your filters
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Name</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Phone</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Guests</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Date</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Time</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Message</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {reservations.map((r) => (
              <tr
                key={r.id}
                className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              >
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.phone}</td>
                <td className="px-4 py-3">{r.guests}</td>
                <td className="px-4 py-3">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{r.time}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-zinc-500 dark:text-zinc-400">
                  {r.message || "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Select
                      value={r.status}
                      onValueChange={(val) => onStatusChange(r.id, val)}
                    >
                      <SelectTrigger className="h-8 w-32 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onViewDetails(r)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => onDelete(r.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {reservations.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{r.phone}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Date:</span>{" "}
                {new Date(r.date).toLocaleDateString()}
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Time:</span> {r.time}
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Guests:</span> {r.guests}
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400">Message:</span>{" "}
                {r.message || "—"}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Select
                value={r.status}
                onValueChange={(val) => onStatusChange(r.id, val)}
              >
                <SelectTrigger className="h-8 flex-1 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onViewDetails(r)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => onDelete(r.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
