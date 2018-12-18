const express = require('express');
const router = express.Router();
const SlackStrategy = require('passport-slack').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// auth endpoints, do not prefix with '/auth'
module.exports = (knex) => {
  passport.use(new SlackStrategy({
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }));

  router.get('/slack', passport.authorize('slack'));

  router.get('/slack/redirect',
    passport.authorize('slack', {
      failureRedirect: '/login',
    }), (req, res) => {
      const createJWT = (user) => {
        const token = jwt.sign(user[0], process.env.PASSPORT_SECRET, {
          expiresIn: 604800, // 1 week
        });

        res.cookie('jwt', token);

        res.redirect('/');
      };

      knex
        .select('*')
        .from('users')
        .where('oauth_id', req.account.user.id)
        .then((record) => {
          if (record.length === 0) {
            knex
              .insert({
                name: req.account.user.name,
                email: req.account.user.email,
                oauth_id: req.account.user.id,
              })
              .into('users')
              .catch((err) => {
                console.log('there was an error: ', err);
              })
              .returning('*')
              .then((newRecord) => {
                createJWT(newRecord);
              });
          } else {
            createJWT(record);
          }
        })
        .catch((err) => {
          console.log('there was an error: ', err);
        });
    });

  return router;
};
