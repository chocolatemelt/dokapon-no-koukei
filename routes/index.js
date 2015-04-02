var express = require('express');
var router = express.Router();

// helper middleware function to validate
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'ドカポンの後継' });
});

module.exports = router;
