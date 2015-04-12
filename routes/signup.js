var express = require('express');
var router = express.Router();

var passport = require('passport');

/* signup page */
router.get('/', function (req, res, next) {
  res.render('signup', { title: 'signup', 
                        message: req.flash('error') });
});

/* signup newuser credentials sent through post */
router.post('/',
  passport.authenticate('signup', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;
