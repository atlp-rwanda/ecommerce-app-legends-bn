export default {
  '/api/v1/buyers/view/recommendations': {
    get: {
      tags: ['Buyers'],
      description: 'User should be able to view recommended products',
      parameters: [],
      responses: {
        200: {
          description: 'User is able to view recommended products',
        },
        401: {
          description: { message: 'access dinied' },
        },
      },
    },
  },
};
