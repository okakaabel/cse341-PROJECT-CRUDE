const express = require('express');
const routes = require('express').Router();

const booksControllers = require ('../Controllers/booksController.js');
const {isAuthenticated} = require ("../milddleware/authenticate.js");

routes.post('/',isAuthenticated, booksControllers.createBook);
routes.put ('/:id',isAuthenticated, booksControllers.updateBook);
routes.delete ('/:id',isAuthenticated, booksControllers.deleteBook);

routes.get ('/', booksControllers.getAll);
routes.get ('/:id',booksControllers.getSingle);

module.exports = routes;