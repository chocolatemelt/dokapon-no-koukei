var express = require('express');
var socketIO = require('socket.io');
var colors = require('colors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var login  = require('./routes/login');
var chat   = require('./routes/chat');

// express
var app = express();

// socket.io
var io = socketIO();
app.io = io;

// some useful (?) constants (?) refactor/remove when necessary
// these just make life easier
var inDevelopment = app.get('env') === 'development';

// tells express to initialize passport
app.use(passport.initialize());

// sets up our strategy for verifying passwords
// TODO: should we use sessions? If so then we might have to make a 
//  session secret which should be regularly updated, and that we should
//  not allow on the github repo
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// tells jade to use pretty html
if (inDevelopment) {
  app.locals.pretty = true;
}

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/chat', chat);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (inDevelopment) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// socket stuff - hopefully we can put this in a separate file
io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('chat message', 'a user connected');
  socket.on('disconnect', function() {
    console.log('a user disconnected');
    io.emit('chat message', 'a user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

module.exports = app;
