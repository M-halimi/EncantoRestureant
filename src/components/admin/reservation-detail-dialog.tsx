"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "./status-badge"
import { Clock, Loader2 } from "lucide-react"

interface ActivityLogEntry {
  id: string
  action: string
  fromStatus: string | null
  toStatus: string | null
  createdAt: string
  changedBy: { name: string; email: string } | null
}

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

interface Props {
  reservation: Reservation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservationDetailDialog({ reservation, open, onOpenChange }: Props) {
  const [logs, setLogs] = useState<ActivityLogEntry[] | null>(null)
  const fetchedId = useRef<string | null>(null)

  useEffect(() => {
    if (!open || !reservation) return

    const id = reservation.id
    if (fetchedId.current === id && logs !== null) return

    fetchedId.current = id

    fetch("/api/activity-logs")
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.logs || []).filter(
          (l: ActivityLogEntry) => l.id.startsWith(id.substring(0, 8))
        )
        setLogs(filtered.length ? filtered : data.logs || [])
      })
      .catch(() => setLogs([]))
  }, [open, reservation, logs])

  if (!reservation) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reservation Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">ID</span>
              <p className="font-mono text-xs">{reservation.id}</p>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Status</span>
              <div className="mt-1"><StatusBadge status={reservation.status} /></div>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Name</span>
              <p className="font-medium">{reservation.name}</p>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Email</span>
              <p>{reservation.email || "—"}</p>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Phone</span>
              <p>{reservation.phone}</p>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Guests</span>
              <p>{reservation.guests}</p>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Date</span>
              <p>{new Date(reservation.date).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">Time</span>
              <p>{reservation.time}</p>
            </div>
            <div className="col-span-2">
              <span className="text-zinc-500 dark:text-zinc-400">Message</span>
              <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                {reservation.message || "No message"}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-zinc-500 dark:text-zinc-400">Booked At</span>
              <p>{new Date(reservation.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <Clock className="h-4 w-4" />
              Activity Log
            </h4>
            {logs === null ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              </div>
            ) : logs.length === 0 ? (
              <p className="text-sm text-zinc-400">No activity recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize text-zinc-700 dark:text-zinc-300">
                        {log.action.replace("_", " ")}
                      </span>
                      <span className="text-zinc-400">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {log.fromStatus && log.toStatus && (
                      <p className="mt-0.5 text-zinc-500">
                        {log.fromStatus} → {log.toStatus}
                      </p>
                    )}
                    {log.changedBy && (
                      <p className="mt-0.5 text-zinc-400">
                        by {log.changedBy.name} ({log.changedBy.email})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
