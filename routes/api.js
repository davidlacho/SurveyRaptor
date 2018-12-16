const express = require('express');
const generatePassword = require('password-generator');

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

  return router;
};
