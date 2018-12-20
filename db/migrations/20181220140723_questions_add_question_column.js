exports.up = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.string('question');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('questions', function(table) {
    table.dropColumn('question');
  });
};
