import swagger from 'swagger-ui-express';
import home from './home';
import schemas from './shema';
import admin from './admin';
import register from './register';
import login from './login';
import { Router } from 'express';
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
  api: `http://localhost:${process.env.PORT || 4000}/`,
  security: [],
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
  tags: [
    { name: 'home', description: 'home' },
    {
      name: 'admin',
      description: 'endpoints that offer special priviledge functions to admin',
    },
  ],
  paths: { ...home, ...admin, ...register, ...login },
};

swaggerDocRouter.use('/docs', serve, setup(options));

export default swaggerDocRouter;
