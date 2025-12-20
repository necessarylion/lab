import { Model } from "objection"
import Post from "./post"

export default class User extends Model {
	static tableName = "users"

	declare id: number

	declare name: string

	declare email: string

	declare password: string

	static relationMappings = {
		posts: {
			relation: Model.HasManyRelation,
			modelClass: Post,
			join: {
				from: "posts.userId",
				to: "users.id",
			},
		},
	}
}
