import { Service } from "typedi"

@Service()
export default class WebController {
	async home() {
		return {
			message: "Welcome to the Home Page!",
		}
	}
}
