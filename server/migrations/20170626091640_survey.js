
exports.up = function(knex) {
  return knex.schema.createTable('survey', (table) => {
    table.increments()
    table.text('q1').notNullable()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('survey')
}
