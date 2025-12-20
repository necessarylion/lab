import type { Context } from "hono"
import { Service } from "typedi"
import UserService from "@/app/services/user-service"

@Service()
export default class UserController {
	constructor(private readonly userService: UserService) {}

	async getUsers(_c: Context) {
		return await this.userService.getUsers()
	}

	async createUser(_c: Context) {
		return await this.userService.createUser()
	}
}
