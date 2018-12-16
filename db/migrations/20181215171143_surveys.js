exports.up = function(knex, Promise) {
  return knex.schema.createTable('surveys', function(table) {
    table.increments('id').primary().unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('surveys');
};
