import { Infer } from "@vinejs/vine/types"
import { Service } from "typedi"
import User from "../models/user"
import { userCreateValidator } from "../validators/user-validator"

@Service()
export default class UserService {
	async createUser(payload: Infer<typeof userCreateValidator>) {
		const data = await User.query().insert({
			name: payload.name,
			email: payload.email,
			password: payload.password,
		})
		return data
	}

	async getUsers() {
		return await User.query().withGraphFetched("posts")
	}
}
