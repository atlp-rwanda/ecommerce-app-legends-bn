export default {
  '/api/admin/login': {
    post: {
      tags: ['Auth'],
      description: 'User login',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            example: {
              email: 'example@gmail.com',
              password: '12345678',
            },
          },
        },
        required: true,
      },
      responses: {
        201: {
          description: 'User logged in successfully',
        },
        401: {
          description: { message: 'password doesn\'t match' },
        }
      },
    },
  },
};
