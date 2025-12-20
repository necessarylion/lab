import UserController from "@/controllers/user-controller"
import { C } from "../utils"
import { Hono } from "hono"

const route = new Hono().basePath("/api")

route.get("/users", C(UserController, "getUsers"))
route.post("/users", C(UserController, "createUser"))

export default route
