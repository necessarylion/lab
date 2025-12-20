import "reflect-metadata"
import { Hono } from "hono"
import errorHandler from "@/app/error-handler"
import api from "@/routes/api"
import web from "@/routes/web"

const app = new Hono()
app.route("/", web)
app.route("/", api)
app.onError(errorHandler)

export default app
