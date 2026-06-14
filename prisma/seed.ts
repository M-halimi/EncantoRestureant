import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { hash } from "bcryptjs"
import "dotenv/config"

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./prisma/dev.db" })
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
