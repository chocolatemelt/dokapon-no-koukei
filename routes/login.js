var express = require('express');
var router = express.Router();

var passport = require('passport');

/* login page */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login', 
                        message: req.flash('error') });
});

/* login credentials sent through post */
router.post('/',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;
