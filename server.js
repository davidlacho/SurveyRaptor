// Uncomment this line out for local development. Must be commented for Heroku.
// require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const ENV = process.env.ENV || 'development';

// DB Config:
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);

// Server Config:
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport, knex);

app.use(bodyParser.urlencoded({
  extended: true,
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routing:
// Put all API endpoints under '/api' (This will disappear with GraphQL)

const apiRouter = require('./routes/api');
app.use('/api', apiRouter());

// Passport Login:
const authRouter = require('./routes/auth');
app.use('/auth', authRouter(knex));

app.get('/testauth', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  res.send('hi there');
});

// The 'catchall' handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(PORT);
console.log(`🚀 Server ready at http://localhost:${PORT}`);
