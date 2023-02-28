export default {
  // test
  '/': {
    get: {
      tags: ['home'],
      description: 'Home',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            example: {
              names: 'Anathole Ana10',
              email: 'Ana10@webmail.com',
              description: 'message description',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'route success',
        },
      },
    },
  },
  '/error': {
    get: {
      tags: ['error'],
      description: '404',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            example: {
              names: 'Anathole Ana10',
              email: 'Ana10@webmail.com',
              description: 'message description',
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Not found',
        },
      },
    },
  },

};
