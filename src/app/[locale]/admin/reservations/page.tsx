"use client"

import { useState, useEffect, useTransition, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { FilterBar } from "@/components/admin/filter-bar"
import { ReservationTable } from "@/components/admin/reservation-table"
import { ReservationDetailDialog } from "@/components/admin/reservation-detail-dialog"
import { PaginationBar } from "@/components/admin/pagination-bar"
import { FileDown, RefreshCw, Loader2 } from "lucide-react"

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

export default function AdminReservationsPage() {
  const { data: session } = useSession()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [, startTransition] = useTransition()

  const [detailReservation, setDetailReservation] = useState<Reservation | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const fetchReservations = useCallback(() => {
    if (!session) return

    const params = new URLSearchParams()
    if (status !== "all") params.set("status", status)
    if (dateFrom) params.set("dateFrom", dateFrom)
    if (dateTo) params.set("dateTo", dateTo)
    if (search) params.set("search", search)
    params.set("page", page.toString())
    params.set("perPage", "20")

    fetch(`/api/reservations?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        startTransition(() => {
          setReservations(data.reservations)
          setTotalPages(data.totalPages)
          setTotal(data.total)
          setLoading(false)
        })
      })
      .catch(() => {
        startTransition(() => setLoading(false))
      })
  }, [session, status, dateFrom, dateTo, search, page])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const handleRefresh = () => {
    setLoading(true)
    fetchReservations()
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        )
        setDetailReservation(null)
      }
    } catch {
      console.error("Failed to update status")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return

    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id))
        setTotal((prev) => prev - 1)
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete")
      }
    } catch {
      console.error("Failed to delete reservation")
    }
  }

  const handleViewDetails = (r: Reservation) => {
    setDetailReservation(r)
    setDetailOpen(true)
  }

  const handleExport = () => {
    window.open("/api/reservations/export", "_blank")
  }

  if (!session) return null

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Reservations</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your incoming reservations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            className="bg-teal-700 hover:bg-teal-800"
            onClick={handleExport}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <FilterBar
          search={search}
          dateFrom={dateFrom}
          dateTo={dateTo}
          status={status}
          onSearchChange={(val) => { setSearch(val); setPage(1) }}
          onDateFromChange={(val) => { setDateFrom(val); setPage(1) }}
          onDateToChange={(val) => { setDateTo(val); setPage(1) }}
          onStatusChange={(val) => { setStatus(val); setPage(1) }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      ) : (
        <>
          <ReservationTable
            reservations={reservations}
            onStatusChange={handleStatusChange}
            onViewDetails={handleViewDetails}
            onDelete={handleDelete}
          />
          <PaginationBar
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={setPage}
          />
        </>
      )}

      <ReservationDetailDialog
        reservation={detailReservation}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  )
}
