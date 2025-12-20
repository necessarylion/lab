import { Context } from "hono";
import { Prisma } from "./generated/prisma/client";

export default function errorHandler(err: Error, c: Context) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return c.json({ success: false, message: err.message, prismaErrorCode: err.code }, 400);
  }
  return c.json({ success: false, message: err.message }, 500)
}