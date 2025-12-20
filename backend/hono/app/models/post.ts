import { Model } from "objection"

export default class Post extends Model {
	static tableName = "posts"

	declare id: number

	declare title: string

	declare content: string

	declare userId: number
}
