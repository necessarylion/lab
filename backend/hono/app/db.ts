import { logger } from "@sentry/bun"
import { env } from "bun"
import knex from "knex"
import { knexSnakeCaseMappers, Model } from "objection"
// @ts-expect-error
import config from "@/knexfile"

export const db = knex({
	...config,
	...knexSnakeCaseMappers(),
})
Model.knex(db)

export async function runMigration() {
	if (env.APP_ENV === "production") {
		try {
			logger.info("Running database migrations...")
			await db.migrate.latest()
			logger.info("Database migrated")
		} catch (error: any) {
			logger.error("Error running migrations:", { message: error.message })
		}
	}
}
