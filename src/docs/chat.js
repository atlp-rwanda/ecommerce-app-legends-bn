export default {
    '/api/v1/chat/messages/send': {
      post: {
        tags: ['Chat'],
        description: 'public chat messages',
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
                $ref: '#/components/schemas/chat',
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
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    
    '/api/v1/chat/messages/all': {
        get: {
          tags: ['Chat'],
          description: 'Viewing all past messages',
          parameters: [],
          requestBody: {},
          responses: {
            200: {
              description: 'messaged retrived',
            },
            500: {
              description: 'Internal Server Error',
            },
          },
        },
      },
}  