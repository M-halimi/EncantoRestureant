import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { updateStatusSchema } from "@/lib/validations"
import { logActivity } from "@/lib/activity-log"
import { sendStatusUpdate } from "@/lib/email"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateStatusSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid status", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const existing = await prisma.reservation.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: parsed.data.status },
    })

    await logActivity({
      reservationId: id,
      action: "status_changed",
      fromStatus: existing.status,
      toStatus: parsed.data.status,
      changedById: session.user.id,
    })

    if (existing.email) {
      sendStatusUpdate({
        name: existing.name,
        email: existing.email,
        date: existing.date.toISOString().split("T")[0],
        time: existing.time,
        status: parsed.data.status,
      })
    }

    return NextResponse.json({ success: true, reservation })
  } catch {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const { id } = await params

    const existing = await prisma.reservation.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    await logActivity({
      reservationId: id,
      action: "deleted",
      changedById: session.user.id,
    })

    await prisma.reservation.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Reservation not found" },
      { status: 404 }
    )
  }
}
