
exports.up = function(knex, Promise) {
  return knex.schema.table('respondents', function(table) {
    table.dropColumn('user_id');
    table.string('slack_id');
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('respondents', function(table) {
    table.string('user_id');
    table.foreign('user_id');
    table.dropColumn('slack_id');
  });
};
