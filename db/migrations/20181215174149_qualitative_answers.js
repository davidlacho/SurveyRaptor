exports.up = function(knex, Promise) {
  return knex.schema.createTable('qualitative_answers', function(table) {
    table.increments('id').unsigned().notNullable();
    table.integer('question_id').unsigned().notNullable();
    table.foreign('question_id').references('id').inTable('questions');
    table.integer('respondent_id').unsigned().notNullable();
    table.foreign('respondent_id').references('id').inTable('respondents');
    table.string('answer');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('qualitative_answers');
};
