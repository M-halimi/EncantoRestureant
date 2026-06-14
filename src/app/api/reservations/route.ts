import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { createReservationSchema, reservationQuerySchema } from "@/lib/validations"
import { logActivity } from "@/lib/activity-log"
import { sendReservationConfirmation } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = createReservationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, phone, guests, date, time, message } = parsed.data

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email: email || null,
        phone,
        guests,
        date: new Date(date),
        time,
        message: message || null,
      },
    })

    await logActivity({
      reservationId: reservation.id,
      action: "created",
    })

    sendReservationConfirmation({
      name,
      email: email || "",
      date,
      time,
      guests,
    }).catch((err) => console.warn("Failed to send confirmation email:", err))

    return NextResponse.json({ success: true, reservation }, { status: 201 })
  } catch (error) {
    console.error("Reservation creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const parsed = reservationQuerySchema.safeParse(Object.fromEntries(searchParams))

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { status, dateFrom, dateTo, search, page, perPage } = parsed.data

  const where: Record<string, unknown> = {}

  if (status && status !== "all") {
    where.status = status
  }

  if (dateFrom || dateTo) {
    const dateFilter: Record<string, Date> = {}
    if (dateFrom) dateFilter.gte = new Date(dateFrom)
    if (dateTo) {
      const end = new Date(dateTo)
      end.setHours(23, 59, 59, 999)
      dateFilter.lte = end
    }
    where.date = dateFilter
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { id: { contains: search } },
    ]
  }

  const [reservations, total] = await Promise.all([
    prisma.reservation.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.reservation.count({ where }),
  ])

  return NextResponse.json({
    reservations,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  })
}
