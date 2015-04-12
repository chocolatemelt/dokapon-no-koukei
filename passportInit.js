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
    userModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // set strategy for password verification
  var userModel = mongoose.model('User', userSchema);
  passport.use('login', new LocalStrategy(
    function(username, password, done) {
      userModel.findOne({ 'username': username }, function(err, user) {
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

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        userModel.findOne({ 'username': username }, function (err, user) {
          if (err) { return done(err); }
          if (user) {
            return done(null, false, { message: 'User already exists.' });
          } else {
            // inserting into the database 
            // automatically hashes for us
            var newUser = new userModel(
              { 'username': username,
                'password': password,
                'email': req.body.email })
            
            // save user
            newUser.save(function (err) {
              if (err) {
                console.log('Error in saving user: ' + err);
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      };
    
      // delay execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
  );
    
};

module.exports = passportInit;
