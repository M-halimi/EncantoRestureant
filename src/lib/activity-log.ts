import { prisma } from "./prisma"

export async function logActivity(params: {
  reservationId: string
  action: string
  fromStatus?: string | null
  toStatus?: string | null
  changedById?: string | null
}) {
  await prisma.activityLog.create({
    data: {
      reservationId: params.reservationId,
      action: params.action,
      fromStatus: params.fromStatus ?? null,
      toStatus: params.toStatus ?? null,
      changedById: params.changedById ?? null,
    },
  })
}
