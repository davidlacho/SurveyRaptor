const express = require('express');
const generatePassword = require('password-generator');
const passport = require('passport');

const router = express.Router();

// API endpoints, do not prefix with '/api'
module.exports = () => {
  router.get('/passwords', (req, res) => {
    const count = 5;

    // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(() => generatePassword(12, false));

    // Return them as json
    res.json(passwords);
  });

  router.post('/buildSurvey', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log(req.user);
    res.json('you made it.');
  });



  return router;
};
