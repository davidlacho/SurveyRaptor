if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

const JwtStrategy = require('passport-jwt').Strategy;

module.exports = (passport, knex) => {
  const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.PASSPORT_SECRET,
  };

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    knex.select('*').from('users').where('oauth_id', jwtPayload.oauth_id)
      .then((err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user[0]) {
          return done(null, user[0]);
        }
        return done(null, false);
      });
  }));
};
