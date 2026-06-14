import { prisma } from "./src/lib/prisma"

async function main() {
  try {
    await prisma.$connect()
    console.log("DB connected")
    const count = await prisma.reservation.count()
    console.log("Reservation count:", count)
  } catch (e) {
    console.error("Error:", e instanceof Error ? e.message : e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
