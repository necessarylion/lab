import { env } from "bun"
import { Knex } from "knex"

const dbConfig: Knex.Config = {
	client: "mysql2",
	connection: env.DATABASE_URL,
	pool: { min: 1, max: 10 },
}

export default dbConfig
