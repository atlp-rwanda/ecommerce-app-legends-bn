export default {

  '/': {
    get: {
      tags: ['home'],
      description: 'Home',
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
      description: '404 not found',
      responses: {
        404: {
          description: 'Not found',
        },
      },
    },
  },

};
