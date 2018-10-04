var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

const User = require('../users');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        User.findOne({ email: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
            console.log(password);
          }
          return done(null, user);
        });
      }
));