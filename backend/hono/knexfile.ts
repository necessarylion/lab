import type { Knex } from "knex"

const config: Knex.Config = {
	client: "mysql2",
	connection: process.env.DATABASE_URL,
}

module.exports = config
