"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Loader2 } from "lucide-react"

const reservationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.string().min(1, "Number of guests is required"),
  message: z.string().optional(),
})

type ReservationFormData = z.infer<typeof reservationSchema>

const timeSlots = Array.from({ length: 21 }, (_, i) => {
  const hour = 12 + Math.floor(i / 2)
  const minute = i % 2 === 0 ? "00" : "30"
  return `${hour.toString().padStart(2, "0")}:${minute}`
})

export function ReservationForm() {
  const t = useTranslations("contact")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const today = new Date().toISOString().split("T")[0]

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  })

  const onSubmit = async (data: ReservationFormData) => {
    setError(null)
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to submit reservation")
      }

      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 6000)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {submitted && (
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          {t("reserveSuccess")}
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="reserve-name">{t("reserveName")}</Label>
        <Input id="reserve-name" {...register("name")} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reserve-email">
          Email
          <span className="ml-1 text-zinc-400 dark:text-zinc-500">({t("optional")})</span>
        </Label>
        <Input id="reserve-email" type="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reserve-phone">{t("reservePhone")}</Label>
        <Input id="reserve-phone" type="tel" placeholder="06 XX XX XX XX" {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reserve-date">{t("reserveDate")}</Label>
          <Input id="reserve-date" type="date" min={today} {...register("date")} />
          {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>{t("reserveTime")}</Label>
          <Select onValueChange={(val) => setValue("time", val)}>
            <SelectTrigger>
              <SelectValue placeholder="--:--" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reserve-guests">{t("reserveGuests")}</Label>
        <Select onValueChange={(val) => setValue("guests", val)}>
          <SelectTrigger>
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n} {n === 1 ? "guest" : "guests"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.guests && <p className="text-xs text-red-500">{errors.guests.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reserve-message">
          {t("reserveMessage")}
          <span className="ml-1 text-zinc-400 dark:text-zinc-500">({t("optional")})</span>
        </Label>
        <Textarea id="reserve-message" rows={3} {...register("message")} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-teal-700 hover:bg-teal-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          t("reserveSubmit")
        )}
      </Button>
    </form>
  )
}
