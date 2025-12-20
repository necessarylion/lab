import { env } from "bun"
import knex from "knex"
import dbConfig from "@/config/db"

export const db = knex(dbConfig)

export function runMigration() {
	if (env.APP_ENV === "production") {
		db.migrate
			.latest()
			.then(() => {
				console.log("Database migrated")
			})
			.catch((err) => {
				console.error("Database migration failed:", err)
			})
	}
}
