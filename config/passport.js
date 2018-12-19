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
    knex.select('*').from('slack_bots').where('bot_user_id', jwtPayload.bot_user_id).andWhere('creator_id', jwtPayload.creator_id)
      .then((bot) => {
        if (bot[0]) {
          return done(null, bot[0]);
        }
        return done(null, false);
      })
      .catch(err => done(err, false));
  }));
};
