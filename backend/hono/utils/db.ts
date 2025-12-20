import { PrismaClient } from "@/generated/prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { env } from "bun"

export const prisma = new PrismaClient({
	adapter: new PrismaMariaDb(env.DATABASE_URL || ""),
})
