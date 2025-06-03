const passport = require('passport');
const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
  res.send('Hello World');
});

routes.get('/login', passport.authenticate('github'),(req,res) => {});
routes.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

routes.use('/books', require('./books'));

module.exports = routes;