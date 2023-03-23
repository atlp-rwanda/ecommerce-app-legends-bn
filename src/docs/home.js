export default {

  '/': {
    get: {
      tags: ['home'],
      description: 'Home',
      parameters: [],
      requestBody: {},
      responses: {
        200: {
          description: 'route success',
        },
      },
    },
  },
  '/error': {
    get: {
      tags: ['error page'],
      description: '404',
      parameters: [],
      requestBody: {
        content: {},
      },
      responses: {
        401: {
          description: 'Not found',
        },
      },
    },
  },

};
