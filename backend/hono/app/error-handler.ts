import type { Context } from "hono"

export default function errorHandler(err: Error, c: Context) {
	return c.json(
		{ success: false, message: err.message || "Internal server error" },
		500,
	)
}
