export default {
  '/api/v1/orderDetails/{trackingId}': {
    get: {
      summary: 'Get order details by tracking number',
      tags: ['Order Details'],
      parameters: [
        {
          in: 'path',
          name: 'trackingId',
          required: true,
          description: 'Tracking number of the order to retrieve details for',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Order details retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetails',
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Order not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Order not found',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Server error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/orders': {
    get: {
      summary: 'get your order status for buyer',
      tags: ['Order Details'],
      parameters: [],
      responses: {
        200: {
          description: 'ok',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  schema: {
                    status: 'success',
                    order: {
                      id: '1b86af1e-8363-476e-a68b-b1185329f67b',
                      amount: '560',
                      products: ['3d81c396-2595-4fde-8008-d771688558f2'],
                      status: 'change4',
                      location: 'Rwanda',
                      userId: 'de4d6360-0f7d-4c62-bfc8-57fb4d22954f',
                      trackingNumber: null,
                      createdAt: '2023-04-13T20:14:14.547Z',
                      updatedAt: '2023-04-15T21:50:20.360Z',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/orders/{id}': {
    put: {
      tags: ['Order Details'],
      description: 'vendor changes the status of order',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'the id of the order',
          schema: {
            type: 'string',
            example: '1b86af1e-8363-476e-a68b-b1185329f67b',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'string',
              description: 'set the new status here',
              example: {
                status: 'shipping',
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'ok',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  status: 'success',
                  message: 'order status updated',
                },
              },
            },
          },
        },
      },
    },
  },
};
