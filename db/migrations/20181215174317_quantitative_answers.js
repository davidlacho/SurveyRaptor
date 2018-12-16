exports.up = function(knex, Promise) {
  return knex.schema.createTable('quantiative_answers', function(table) {
    table.increments('id').unsigned().notNullable();
    table.integer('respondent_id').unsigned().notNullable();
    table.foreign('respondent_id').references('id').inTable('respondents');
    table.integer('quantiative_possible_answers_id').unsigned().notNullable();
    table.foreign('quantiative_possible_answers_id').references('id').inTable('quantiative_possible_answers');
    table.string('answer');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quantiative_answers');
};
