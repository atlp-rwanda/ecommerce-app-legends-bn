// eslint-disable-next-line import/no-extraneous-dependencies
import swagger from 'swagger-ui-express';
import home from './home';
import schemas from './shema';

const { Router } = require('express');

const { serve, setup } = swagger;

const swaggerDocRouter = Router();

const options = {
  openapi: '3.0.3',
  info: {
    title: 'ecommerce-app-legends-bn-',
    version: '1.0.0',
    description:
      'The API documentation of all end-points ecommerce-app-legends-bn-',
  },
  api: 'http://localhost:5000/',
  security: [],
  tags: [
    { name: 'home', description: 'home' },
  ],
  paths: { ...home },
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

};

swaggerDocRouter.use('/docs', serve, setup(options));

export default swaggerDocRouter;
