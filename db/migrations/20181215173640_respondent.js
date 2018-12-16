exports.up = function(knex, Promise) {
  return knex.schema.createTable('respondents', function(table) {
    table.increments('id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('survey_id').unsigned().notNullable();
    table.foreign('survey_id').references('id').inTable('surveys');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('respondents');
};
