import { Hono } from "hono"
import WebController from "@/app/controllers/web-controller"
import { C } from "@/utils"

const route = new Hono()

route.get("/", C(WebController, "home"))

export default route
