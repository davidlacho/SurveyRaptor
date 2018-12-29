exports.up = function(knex, Promise) {
  return knex.schema.table('surveys', function(table) {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('surveys', function(table) {
    table.timestamps();
  });
};
