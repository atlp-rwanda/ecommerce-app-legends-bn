export default {
  '/api/v1/product/wishlist': {
    post: {
      tags: ['Product wishlist'],
      description: 'add a Product to wishlist ',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['product_id'],
              properties: {
                productId: {
                  type: 'string',
                  description: 'product id',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'ok',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  message: 'product added to wishlist',
                  status: 'success',
                },
              },
            },
          },
        },
        400: {
          description: 'Product already exists in wishlist',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  message: 'Product already exists in wishlist',
                  status: 'failed',
                },
              },
            },
          },
        },
        500: {
          description: 'internal server error',
        },
      },
    },
    get: {
      tags: ['Product wishlist'],
      description: 'get all products in wishlist',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'products in wishlist',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                example: {
                  id: 'f7c0bc5c-28f2-4c54-9ada-3d07fcad8e3b',
                  name: '"chips 101"',
                  slug: '"chips-101"',
                  description: '"food test"',
                  model: '"unhealthy model"',
                  image:
                    'http://res.cloudinary.com/djxd7l6ve/image/upload/v1679641211/nxxhn78w2wxv3qmkhu6j.jpg',
                  keyword: '"foody" ',
                  status: null,
                  categoryId: 2,
                  userId: 'f23b1f62-d719-4774-997e-223b8232214a',
                  createdAt: '2023-03-24T07:00:13.461Z',
                  updatedAt: '2023-03-24T07:00:13.461Z',
                  Category: {
                    id: 2,
                    name: 'unhealthy',
                    status: 'available',
                    createdAt: '2023-03-24T06:59:28.217Z',
                    updatedAt: '2023-03-24T06:59:28.217Z',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/product/wishlist/{product}': {
    delete: {
      tags: ['Product wishlist'],
      description: 'add a Product to wishlist ',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'product',
          in: 'path',
          description: 'product id',
          required: true,
          type: 'string',
          example: '3e7b7d4f-d9d0-4ee2-8413-5df9c4ec6491',
        },
      ],
      responses: {
        200: {
          description: 'ok',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: { message: 'removed from wishlist' },
              },
            },
          },
        },
        400: {
          description: 'failed',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  message: 'Product does not exists in wishlist',
                  status: 'failed',
                },
              },
            },
          },
        },
        500: {
          description: 'internal server error',
        },
      },
    },
  },
};
