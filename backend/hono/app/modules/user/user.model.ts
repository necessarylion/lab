import { column, hasMany } from "standalone-lucid/orm"
import type { HasMany } from "standalone-lucid/types/relations"
import { Model } from "@/utils/lucid"
import Post from "../post/post.model"

export default class User extends Model {
	@column({ isPrimary: true })
	declare id: number

	@column()
	declare name: string

	@column()
	declare email: string

	@column()
	declare password: string

	@hasMany(() => Post)
	declare posts: HasMany<typeof Post>
}
