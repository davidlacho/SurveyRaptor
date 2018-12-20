const express = require('express');
const passport = require('passport');

const router = express.Router();

// API endpoints, do not prefix with '/api'
module.exports = (knex) => {
  // Serves the logged in user data
  router.get('/userdata', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('users')
      .join('slack_bots', 'slack_bots.creator_id', '=', 'users.slack_id')
      .select('name', 'email', 'image_24', 'image_32', 'image_48', 'image_72', 'image_192', 'image_512', 'team_name')
      .where('slack_id', req.user.creator_id)
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        res.json(err);
      });

    // req.user.id,
    // req.user.access_token,
    // req.user.creator_id,
    // req.user.team_name,
    // req.user.bot_user_id,
    // req.user.bot_access_token
  });

  router.post('buildsurvey', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    knex('users')
      .select('id')
      .where('slack_id', req.user.creator_id)
      .then((record) => {
        console.log(record);
      });

  });

  return router;
};
