export default {
  '/api/v1/products/{id}': {
    get: {
      tags: ['Product'],
      description: 'User is able to view single product',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the user to disable',
          required: true,
          type: 'integer',
        },
      ],
      responses: {
        200: {
          description: 'User is able to view single product',
        },
        401: {
          description: { message: 'access dinied' },
        },
      },
    },
  },
};
