import nodemailer from "nodemailer"

function getTransporter() {
  const host = process.env.SMTP_HOST
  if (!host) return null

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendReservationConfirmation(params: {
  name: string
  email: string
  date: string
  time: string
  guests: number
}) {
  const transporter = getTransporter()
  if (!transporter || !params.email) return

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "noreply@encanto.ma",
    to: params.email,
    subject: "Reservation Confirmed - Encanto Restaurant",
    text: `Dear ${params.name},\n\nYour reservation for ${params.guests} guests on ${params.date} at ${params.time} has been received.\n\nWe look forward to serving you!\n\nEncanto Restaurant`,
  })
}

export async function sendStatusUpdate(params: {
  name: string
  email: string
  date: string
  time: string
  status: string
}) {
  const transporter = getTransporter()
  if (!transporter || !params.email) return

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "noreply@encanto.ma",
    to: params.email,
    subject: `Reservation ${params.status} - Encanto Restaurant`,
    text: `Dear ${params.name},\n\nYour reservation for ${params.date} at ${params.time} has been ${params.status}.\n\nEncanto Restaurant`,
  })
}
