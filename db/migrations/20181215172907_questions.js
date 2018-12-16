exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function(table) {
    table.increments('id').primary().unsigned().notNullable();
    table.integer('survey_id').unsigned().notNullable();
    table.foreign('survey_id').references('id').inTable('surveys');
    table.string('question_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions');
};
