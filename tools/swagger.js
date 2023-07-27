const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['../src/app.js'];

const securityDefinitions = {
  Bearer: {
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
    description: 'Please enter a valid token to test the requests below...',
  },
};

const config = {
  info: {
    version: '1.0.0',
    title: 'devNexus',
    description:
      'The devNexus API provides users around the world with a way to keep track of their favorite programming languages, areas of interest and technologies, as well as staying up to date with the communities favorite resources.',
  },
  host: 'devnexus-i46j.onrender.com',
  basePath: '/',
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  security: [
    {
      Bearer: []
    }],
};

swaggerAutogen(outputFile, endpointsFiles, { ...config, securityDefinitions });
