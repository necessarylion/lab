import type { Context } from "hono"
import { Prisma } from "@/app/prisma/client"

export default function errorHandler(err: Error, c: Context) {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		return c.json(
			{
				success: false,
				message: err.message.split("\n").pop(),
				prismaErrorCode: err.code,
				meta: err.meta,
			},
			400,
		)
	}
	return c.json({ success: false, message: err.message }, 500)
}
