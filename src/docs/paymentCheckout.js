export default {
  '/api/v1/checkout': {
    post: {
      tags: ['payment checkout'],
      summary: 'Checkout process',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/shoppingCart',
            },
            example: {
              location: 'Rwanda',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: "Product doesn't exist!",
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  '/api/v1/checkout/payment': {
    post: {
      tags: ['payment checkout'],
      summary: 'Checkout process, paying the order',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/shoppingCart',
            },
            example: {
              cardNumber: '4242424242424242',
              exp_month: 12,
              exp_year: 2024,
              cvcNumber: '123',
              currency: 'rwf'
            },
          },
        },
      },
      responses: {
        201: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: "Product doesn't exist!",
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
};