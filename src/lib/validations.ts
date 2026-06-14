import { z } from "zod"

export const createReservationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
  guests: z.coerce.number().int().min(1, "At least 1 guest"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
})

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
})

export const reservationQuerySchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed", "all"]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
})
