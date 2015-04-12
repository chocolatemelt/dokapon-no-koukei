var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var mongoStore = require('express-session-mongo');
var userSchema = require('./models/users.js');
var userModel = mongoose.model('User', userSchema);

var passportInit = function() {
  // set functions for use by passport session
  // which define what is being stored as a cookie
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    findById(id, function(err, user) {
      done(err, user);
    });
  });

  // set strategy for password verification
  var userModel = mongoose.model('User', userSchema);
  passport.use(new LocalStrategy(
    function(username, password, done) {
      userModel.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password, function (err, isMatch) {
          if (err) { return done(err); }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    }
  ));
};

module.exports = passportInit();
