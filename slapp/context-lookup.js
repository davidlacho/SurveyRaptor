// Slapp context middleware function
// Looks up team info from knex and enriches request
module.exports = knex => (req, res, next) => {
  knex('slack_bots')
    .join('users', 'slack_bots.creator_id', '=', 'users.slack_id')
    .select('access_token', 'bot_access_token', 'bot_user_id', 'team_name')
    .where({
      bot_user_id: req.user.bot_user_id,
    })
    .then((record) => {
      console.log(record);
      req.slapp.meta = Object.assign(req.slapp.meta, {
        app_token: record[0].access_token,
        bot_token: record[0].bot_access_token,
        bot_user_id: record[0].bot_user_id,
        team_name: record[0].team_name,
      });

      next();
    });
};
