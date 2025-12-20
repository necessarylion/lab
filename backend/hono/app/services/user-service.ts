import { Service } from "typedi"
import { db } from "@/app/db"
import User from "../models/user"

@Service()
export default class UserService {
	async createUser() {
		const data = await User.query().insert({
			name: "John Doe",
			email: "6E0t8@example.com",
			password: "securepassword",
		})
		return data
	}

	async getUsers() {
		return await User.query().select("*").withGraphFetched("posts")
	}
}
