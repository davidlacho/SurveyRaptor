exports.up = function(knex, Promise) {
  return knex.schema.createTable('quantiative_possible_answers', function(table) {
    table.increments('id').unsigned().notNullable();
    table.integer('question_id').unsigned().notNullable();
    table.foreign('question_id').references('id').inTable('questions');
    table.string('possible_answers');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('quantiative_possible_answers');
};
