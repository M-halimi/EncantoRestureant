"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { AnalyticsCards } from "@/components/admin/analytics-cards"
import { Loader2 } from "lucide-react"

interface Stats {
  total: number
  pending: number
  confirmed: number
  cancelled: number
  completed: number
  todayCount: number
}

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) return

    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [session])

  if (!session) return null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Overview of your reservation activity
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      ) : (
        <AnalyticsCards stats={stats} />
      )}
    </div>
  )
}
