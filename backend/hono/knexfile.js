const connection = process.env.DATABASE_URL || ""

function getConnectionConfig(url) {
	if (!url) return undefined
	try {
		const u = new URL(url)
		return {
			host: u.hostname,
			port: u.port || 3306,
			user: u.username,
			password: u.password,
			database: u.pathname ? u.pathname.slice(1) : undefined,
		}
	} catch (_e) {
		return url
	}
}

module.exports = {
	development: {
		client: "mysql2",
		connection: getConnectionConfig(connection) || connection,
		pool: { min: 0, max: 10 },
		migrations: {
			directory: "./migrations",
		},
	},
}
