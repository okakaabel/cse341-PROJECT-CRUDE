const express = require('express'); 
const routes = require('express').Router();
const { body, validationResult } = require('express-validator');

const librariesControllers = require('../Controllers/librariesController.js');
const { isAuthenticated } = require('../milddleware/authenticate.js');

// Validation rules
const libraryValidationRules = [
  body('libraryName').notEmpty().withMessage('libraryName is required'),
  body('libraryOwner').notEmpty().withMessage('libraryOwner is required'),
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
  libraryValidationRules,
  handleValidationErrors,
  async (req, res) => {
    try {
      await librariesControllers.createlibrary(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while creating library.' });
    }
  }
);

// PUT with validation
routes.put(
  '/:id',
  isAuthenticated,
  libraryValidationRules,
  handleValidationErrors,
  async (req, res) => {
    try {
      await librariesControllers.updatelibrary(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while updating library.' });
    }
  }
);

// GET and DELETE stay the same
routes.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await librariesControllers.deletelibrary(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting library.' });
  }
});

routes.get('/', async (req, res) => {
  try {
    await librariesControllers.getAll(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching library.' });
  }
});

routes.get('/:id', async (req, res) => {
  try {
    await librariesControllers.getSingle(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching library.' });
  }
});

module.exports = routes;
