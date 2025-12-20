import WebController from "@/controllers/web-controller"
import { C } from "../utils"
import { Hono } from "hono"

const route = new Hono()

route.get("/", C(WebController, "home"))

export default route
