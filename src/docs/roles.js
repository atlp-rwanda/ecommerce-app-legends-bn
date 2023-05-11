export default {
  '/api/v1/roles': {
    get: {
      tags: ['Roles'],
      description: 'Admin should be able to view all roles',
      parameters: [],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'User is able to view all roles',
        },
        401: {
          description: { message: 'access dinied' },
        },
      },
    },
  },

  '/api/v1/roles/update': {
    patch: {
      tags: ['Roles'],
      description: 'Admin should be able to update user role',
      parameters: [],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/roles',
            },
            example: {
              id: 'UUD',
              role: 'integer',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Admin should be able to update user role',
        },
        401: {
          description: { message: 'access dinied' },
        },
      },
    },
  },
};
