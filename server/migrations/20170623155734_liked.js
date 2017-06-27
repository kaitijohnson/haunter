exports.up = function(knex) {
  return knex.schema.createTable('liked', (table) => {
    table.increments()
    table.string('name', 80).notNullable()
    table.string('insights', 80).notNullable()
    table.text('description').notNullable()
    table.text('item_url').notNullable()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('liked')
}
