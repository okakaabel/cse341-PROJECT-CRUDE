const passport = require('passport'); 
const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.get('/', (req, res) => {
  try {
    res.send('Hello World');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading root route.');
  }
});

routes.get('/login', passport.authenticate('github'), (req, res) => {
  try {
    // placeholder, no logic needed
  } catch (error) {
    console.error(error);
    res.status(500).send('Login error.');
  }
});

routes.get('/logout', function (req, res, next) {
  try {
    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send('Logout error.');
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Logout error.');
  }
});

routes.use('/books', require('./books'));

module.exports = routes;
