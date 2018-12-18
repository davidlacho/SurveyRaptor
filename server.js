// Uncomment this line out for local development. Must be commented for Heroku.
// require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid');
const SlackStrategy = require('passport-slack').Strategy;

const app = express();
const PORT = process.env.PORT || 5000;
const ENV = process.env.ENV || 'development';

// DB Config:
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

// Server Config:
app.use(morgan('dev'));

//passport's session piggy-backs on express-session
app.use(session({
  genid: req => uuid.v4(),
  secret: process.env.PASSPORT_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true,
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routing:
// Put all API endpoints under '/api'
// This will disappear with GraphQL

const apiRouter = require('./routes/api');

app.use('/api', apiRouter());

// Passport and Slack Login:

app.use(bodyParser.urlencoded({
  extended: true,
}));

passport.use(new SlackStrategy({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

app.get('/auth/slack', passport.authorize('slack'));
app.get('/auth/slack/callback',
  passport.authorize('slack', {
    failureREdirect: '/login',
  }), (req, res) => res.redirect('/'));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

// The 'catchall' handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(PORT);
console.log(`🚀 Server ready at http://localhost:${PORT}`);
