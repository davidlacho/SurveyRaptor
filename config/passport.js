require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const {
  ExtractJwt,
} = require('passport-jwt');

module.exports = (passport, knex) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.PASSPORT_SECRET,
  };

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    knex('user').find('*').where('oauth_id', jwtPayload._doc._id)
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
