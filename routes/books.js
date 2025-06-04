const express = require('express'); 
const routes = require('express').Router();
const { body, validationResult } = require('express-validator');

const booksControllers = require('../Controllers/booksController.js');
const { isAuthenticated } = require('../milddleware/authenticate.js');

// Validation rules
const bookValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedDate').optional().isISO8601().withMessage('Invalid date format'),
  body('isbn').optional().isString(),
];

// Error handling middleware for validation
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// POST with validation
routes.post(
  '/',
  isAuthenticated,
  bookValidationRules,
  handleValidationErrors,
  async (req, res) => {
    try {
      await booksControllers.createBook(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while creating book.' });
    }
  }
);

// PUT with validation
routes.put(
  '/:id',
  isAuthenticated,
  bookValidationRules,
  handleValidationErrors,
  async (req, res) => {
    try {
      await booksControllers.updateBook(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while updating book.' });
    }
  }
);

// GET and DELETE stay the same
routes.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await booksControllers.deleteBook(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting book.' });
  }
});

routes.get('/', async (req, res) => {
  try {
    await booksControllers.getAll(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching books.' });
  }
});

routes.get('/:id', async (req, res) => {
  try {
    await booksControllers.getSingle(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching book.' });
  }
});

module.exports = routes;
