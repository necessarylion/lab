import "reflect-metadata"
import { Hono } from "hono"
import web from "@/routes/web"
import api from "@/routes/api"
import errorHandler from "@/app/error-handler"

const app = new Hono()
app.route("/", web)
app.route("/", api)
app.onError(errorHandler)

export default app
