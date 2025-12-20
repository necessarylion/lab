import { Service } from "typedi"
import { db } from "@/app/db"

@Service()
export default class UserService {
	async createUser() {
		const trx = await db.transaction()
		try {
			const [user_id] = await trx("users").insert({
				name: "John Doe",
				email: "john.doe@example.com",
				password: "password",
			})
			const posts = [
				{ title: "First Post", content: "This is my first post.", user_id },
				{ title: "Second Post", content: "This is my second post.", user_id },
			]
			await trx("posts").insert(posts)
			await trx.commit()
			const user = await db("users").where({ id: user_id }).first()
			return user
		} catch (err) {
			await trx.rollback()
			throw err
		}
	}

	async getUsers() {
		return await db("users").select("*")
	}
}
