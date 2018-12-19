
exports.up = function(knex, Promise) {
  return knex.schema.createTable('slack_bots', function(table) {
    table.increments('id').unsigned().notNullable();
    table.string('access_token');
    table.string('creator_id');
    table.string('team_name');
    table.string('bot_user_id');
    table.string('bot_access_token');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('slack_bots');
};
