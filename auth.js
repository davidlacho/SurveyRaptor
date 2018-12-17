const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  DB,
} = require('./schema/db.js');

passport.use('local', new LocalStrategy(
  (username, password, done) => {
    const checkPassword = DB.Users.checkPassword(username, password);
    const getUser = checkPassword.then((isLoginValid) => {
      if (isLoginValid) {
        return DB.Users.getUserByUsername(username);
      } else {
        throw new Error('invalid username or password');
      }
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  DB.Users.get(id).then((user, err) => done(err, user));
});
