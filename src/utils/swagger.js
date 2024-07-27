const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple ATM App with Express',
      version: '1.0.0',
      description: 'A simple ATM Machine Express API application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    security: [
        {
            bearerAuth: [],
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },

  },
  apis: [path.join(__dirname, '../routers/*.js')],
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
