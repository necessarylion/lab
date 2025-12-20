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
