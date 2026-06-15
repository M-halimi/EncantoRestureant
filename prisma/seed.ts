import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { hash } from "bcryptjs"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await hash("encanto-admin-2026", 12)

  await prisma.adminUser.upsert({
    where: { email: "admin@encanto.ma" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@encanto.ma",
      password,
      role: "admin",
    },
  })

  console.log("Seed: admin user created")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
