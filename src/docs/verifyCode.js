export default {
    '/api/vendor/verify': {
      post: {
        tags: ['Auth'],
        description: 'vendor account verification',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                verificationCode: 'six digits here',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'verified...! welcome',
          },
          403: {
            description: 'please login first' ,
          },
          500:{
            description:'internal server error' 
          }
        },
      },
    },
  };