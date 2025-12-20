import { env } from "bun"
import knex from "knex"
// @ts-ignore
import config from "@/knexfile"
import { knexSnakeCaseMappers, Model, snakeCaseMappers } from "objection"
import { logger } from "@sentry/bun"

export const db = knex({
	...config,
	...knexSnakeCaseMappers(),
})
Model.knex(db)

export async function runMigration() {
	logger.info(`App environment: ${env.APP_ENV}`)
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
