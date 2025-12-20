import UserService from "@/services/user-service"
import { Context } from "hono"
import { Service } from "typedi"

@Service()
export default class UserController {
	constructor(private readonly userService: UserService) {}

	async getUsers(c: Context) {
		return await this.userService.getUsers()
	}

	async createUser(c: Context) {
		return await this.userService.createUser()
	}
}
