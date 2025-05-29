const express = require('express');
const routes = require('express').Router();

const booksControllers = require ('../Controllers/booksController.js')
routes.post('/', booksControllers.createBook);
routes.put ('/:id', booksControllers.updateBook);
routes.delete ('/:id', booksControllers.deleteBook);

routes.get ('/', booksControllers.getAll);
routes.get ('/:id', booksControllers.getSingle);

module.exports = routes;