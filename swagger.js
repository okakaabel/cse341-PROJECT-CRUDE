const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'localhost:3002',
    schemes:['https','http'] 
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


// this will generate a swagger.json file
swaggerAutogen(outputfile, endpointsFiles, doc);