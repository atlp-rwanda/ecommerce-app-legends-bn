export default {
  '/api/v1/shoppingCart/add': {
    post: {
      tags: ['Shopping Cart'],
      description: 'shopping cart',
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
              $ref: '#/components/schemas/shoppingCart',
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
        404: {
          description: "Product doesn't exist!",
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/v1/shoppingCart/view': {
    get: {
      tags: ['Shopping Cart'],
      description: 'Viewing All Carts',
      parameters: [],
      requestBody: {},
      responses: {
        201: {
          description: 'Viewing Cart',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: "Product doesn't exist!",
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/v1/shoppingCart/update': {
    patch: {
      tags: ['Shopping Cart'],
      description: 'shopping cart',
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
              $ref: '#/components/schemas/shoppingCart',
            },
            example: {
              id: '1',
              quantity: '3',
              productId: '1',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: "Product doesn't exist!",
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/v1/shoppingCart/delete': {
    delete: {
      tags: ['Shopping Cart'],
      description: 'shopping cart',
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
              $ref: '#/components/schemas/shoppingCart',
            },
            example: {
              id: '1',
            },
          },
        },
      },
      responses: {
        204: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: "Product doesn't exist on the cart!",
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },

  '/api/v1/shoppingCart/clear': {
    delete: {
      tags: ['Shopping Cart'],
      summary: "Clear the buyer's shopping cart",
      description:
        "Clears all the items from the buyer's shopping cart and resets the cart total to zero.",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    description: 'Success status message',
                  },
                  data: {
                    type: 'string',
                    description: 'Total price of the cart',
                  },
                  message: {
                    type: 'string',
                    description: 'Success message',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};