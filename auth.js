const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "34879205700-8gksmdqg0lfi826d1rj5qvsh3ccest3o.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
      return cb(null, profile);
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
})
