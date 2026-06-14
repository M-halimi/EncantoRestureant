import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [
    total,
    pending,
    confirmed,
    cancelled,
    completed,
    todayCount,
  ] = await Promise.all([
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.reservation.count({ where: { status: "confirmed" } }),
    prisma.reservation.count({ where: { status: "cancelled" } }),
    prisma.reservation.count({ where: { status: "completed" } }),
    prisma.reservation.count({
      where: { date: { gte: today, lt: tomorrow } },
    }),
  ])

  return NextResponse.json({ total, pending, confirmed, cancelled, completed, todayCount })
}
