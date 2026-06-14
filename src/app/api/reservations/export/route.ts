import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const format = searchParams.get("format")

  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "desc" },
  })

  const dateStr = new Date().toISOString().split("T")[0]

  if (format === "csv") {
    const headers = [
      "Reservation ID",
      "Name",
      "Email",
      "Phone",
      "Guests",
      "Date",
      "Time",
      "Message",
      "Status",
      "Booked At",
    ]

    const csvRows = reservations.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      r.email ? `"${r.email}"` : "",
      `"${r.phone}"`,
      r.guests,
      r.date.toISOString().split("T")[0],
      r.time,
      r.message ? `"${r.message.replace(/"/g, '""')}"` : "",
      r.status,
      r.createdAt.toISOString(),
    ])

    const csv = [headers.join(","), ...csvRows.map((row) => row.join(","))].join("\n")

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="reservations-${dateStr}.csv"`,
      },
    })
  }

  const ExcelJS = await import("exceljs")

  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Reservations")

  sheet.columns = [
    { header: "Reservation ID", key: "id", width: 36 },
    { header: "Name", key: "name", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Guests", key: "guests", width: 10 },
    { header: "Date", key: "date", width: 15 },
    { header: "Time", key: "time", width: 10 },
    { header: "Message", key: "message", width: 35 },
    { header: "Status", key: "status", width: 14 },
    { header: "Booked At", key: "createdAt", width: 20 },
  ]

  const headerRow = sheet.getRow(1)
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } }
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1B7B7B" },
  }
  headerRow.alignment = { vertical: "middle", horizontal: "center" }

  reservations.forEach((r) => {
    sheet.addRow({
      id: r.id,
      name: r.name,
      email: r.email ?? "",
      phone: r.phone,
      guests: r.guests,
      date: r.date.toISOString().split("T")[0],
      time: r.time,
      message: r.message ?? "",
      status: r.status,
      createdAt: r.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        `attachment; filename="reservations-${dateStr}.xlsx"`,
    },
  })
}
