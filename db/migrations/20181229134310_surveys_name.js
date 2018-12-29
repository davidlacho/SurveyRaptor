exports.up = function(knex, Promise) {
  return knex.schema.table('surveys', function(table) {
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('surveys', function(table) {
    table.dropColumn('name');
  });
};
