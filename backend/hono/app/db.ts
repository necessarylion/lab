import { env } from "bun"
import knex from "knex"

export const db = knex({
	client: "mysql2",
	connection: env.DATABASE_URL || process.env.DATABASE_URL || "",
	pool: { min: 0, max: 10 },
})

export const closeDb = async () => await db.destroy()
