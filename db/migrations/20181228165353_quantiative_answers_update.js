exports.up = function(knex, Promise) {
  return knex.schema.table('quantiative_answers', function(table) {
    table.integer('question_id').unsigned().notNullable();
    table.foreign('question_id').references('id').inTable('questions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('quantiative_answers', function(table) {
    table.dropColumn('question_id');
  });
};
