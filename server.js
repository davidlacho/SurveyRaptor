if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser(process.env.PASSPORT_SECRET));
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
  console.log(req);
  res.send('made it here.');
});

// The 'catchall' handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(PORT);
console.log(`🚀 Server ready at http://localhost:${PORT}`);
