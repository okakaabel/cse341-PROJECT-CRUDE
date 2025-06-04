const routes = require('express').Router(); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);

routes.get('/api-docs', (req, res) => {
  try {
    swaggerUi.setup(swaggerDocument)(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Swagger setup error.');
  }
});

module.exports = routes;
