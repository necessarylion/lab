import { prisma } from "@/app/prisma"
import { Service } from "typedi"

@Service()
export default class UserService {
	async createUser() {
		const data = await prisma.user.create({
			data: {
				name: "John Doe",
				email: "john.doe@example.com",
				password: "password",
				posts: {
					create: [
						{ title: "First Post", content: "This is my first post." },
						{ title: "Second Post", content: "This is my second post." },
					]
				}
			},
		})
		return data
	}

	async getUsers() {
		return await prisma.user.findMany()
	}
}
