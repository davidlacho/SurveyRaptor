exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('oauth_id');
    table.string('slack_id').unique();
    table.string('team_id');
    table.string('real_name');
    table.string('image_24');
    table.string('image_32');
    table.string('image_48');
    table.string('image_72');
    table.string('image_192');
    table.string('image_512');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('oauth_id').unique();
    table.dropColumn('slack_id');
    table.dropColumn('team_id');
    table.dropColumn('real_name');
    table.dropColumn('image_24');
    table.dropColumn('image_32');
    table.dropColumn('image_48');
    table.dropColumn('image_72');
    table.dropColumn('image_192');
    table.dropColumn('image_512');
  });
};
