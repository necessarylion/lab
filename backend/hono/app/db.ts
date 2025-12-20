import { env } from "bun"
import knex from "knex"
// @ts-ignore
import config from "@/knexfile"
import { knexSnakeCaseMappers, Model, snakeCaseMappers } from "objection"

export const db = knex({
	...config,
	...knexSnakeCaseMappers(),
})
Model.knex(db)

export async function runMigration() {
	console.log(`App environment: ${env.APP_ENV}`)
	if (env.APP_ENV === "production") {
		try {
			console.log("Running database migrations...")
			await db.migrate.latest()
			console.log("Database migrated")
		} catch (error) {
			console.error("Error running migrations:", error)
		}
	}
}
