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

app.use(express.json());

// SET VIEW ENGINE TO EJS FOR LANDING PAGE
app.set('view engine', 'ejs');
app.set('views');
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home');
});

// If it makes it past landing page, serve static files from React:
app.use(express.static(path.join(__dirname, 'client/build')));

// SLAP Config:

const Slapp = require('slapp');
const ContextLookup = require('./slapp/context-lookup');

const slapp = Slapp({
  context: ContextLookup(knex),
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  log: true,
  colors: true,
});

const friendbot = require('./slapp/friendbot');
const doit = require('./slapp/doit');


// Handle direct messages that are kinda dumb:
friendbot(slapp);
doit(slapp);


slapp.attachToExpress(app);

// Routing:

const apiRouter = require('./routes/api');
app.use('/api', apiRouter(knex));

// Passport Login:
const authRouter = require('./routes/auth');
app.use('/auth', authRouter(knex));

// The 'catchall' handler: for any request that doesn't
// match one above, send back React's index.html file.

app.get('*', passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/',
}), (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen(PORT);
console.log(`🚀 Server ready at http://localhost:${PORT}`);
