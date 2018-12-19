const express = require('express');
const router = express.Router();
const SlackStrategy = require('passport-slack').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const request = require('request');

// auth endpoints, do not prefix with '/auth'
module.exports = (knex) => {
  passport.use(new SlackStrategy({
    clientID: process.env.SLACK_BOT_CLIENT_ID,
    clientSecret: process.env.SLACK_BOT_CLIENT_SECRET,
    scope: ['bot'],
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }));

  router.get('/slack', passport.authorize('slack'));

  router.get('/slackbot/redirect', (req, res) => {
    const data = {
      form: {
        client_id: process.env.SLACK_BOT_CLIENT_ID,
        client_secret: process.env.SLACK_BOT_CLIENT_SECRET,
        code: req.query.code,
      },
    };
    request.post('https://slack.com/api/oauth.access', data, (error, response, body) => {

      const createJWT = (slackbot) => {
        const token = jwt.sign(slackbot[0], process.env.PASSPORT_SECRET, {
          expiresIn: Date.now() + 604800000, // 1 week
        });

        res.cookie('jwt', token);
        res.redirect('/');
      };

      const parsedBody = JSON.parse(body);
      const insertObject = {
        access_token: parsedBody.access_token,
        creator_id: parsedBody.user_id,
        team_name: parsedBody.team_name,
        bot_user_id: parsedBody.bot.bot_user_id,
        bot_access_token: parsedBody.bot.bot_access_token,
      };

      knex
        .select('*')
        .from('slack_bots')
        .where('bot_user_id', parsedBody.bot.bot_user_id || 0)
        .andWhere('creator_id', parsedBody.user_id)
        .then((record) => {
          if (record.length === 0) {
            knex('slack_bots')
              .insert(insertObject)
              .returning('*')
              .then((newRecord) => {
                createJWT(newRecord);
              })
              .catch((err) => {
                console.log('there was an error: ', err);
              });
          } else {
            createJWT(record);
          }
        })
        .catch((err) => {
          console.log('there was an error', err);
        });
    });
  });

  return router;
};
