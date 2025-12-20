import { prisma } from "@/db"
import { Service } from "typedi"

@Service()
export default class UserService {
	async createUser() {
		const data = await prisma.user.create({
			data: {
				name: "John Doe",
				email: "john.doe@example.com",
				password: "password",
			}
		})
		return data;
	}

	async getUsers() {
		return await prisma.user.findMany();
	}
}
