exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('email').notNullable().unique()
    table.string('name')
    table.string('password').notNullable()
  })

  await knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('content')
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('posts')
  await knex.schema.dropTableIfExists('users')
}
