// @ts-expect-error
import config from "@/knexfile"

export default {
	connection: "mysql",
	connections: {
		mysql: config,
	},
}
