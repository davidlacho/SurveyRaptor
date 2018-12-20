const express = require('express');
const generatePassword = require('password-generator');
const passport = require('passport');

const router = express.Router();

// API endpoints, do not prefix with '/api'
module.exports = (knex) => {
  router.get('/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(() => generatePassword(12, false));

    // Return them as json
    res.json(passwords);
  });

  router.post('/buildSurvey', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {

    knex('users')
      .join('slack_bots', 'slack_bots.creator_id', '=', 'users.slack_id')
      .select('*')
      .where('slack_id', req.user.creator_id)
      .then((rows) => {
        console.log(rows);
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

  return router;
};
