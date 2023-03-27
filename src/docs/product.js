const addResponses = {
  201: {
    description: 'successfully',
  },
  204: {
    description: 'No Content related to the ID provided',
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
};

const updateResponses = {
  200: {
    description: 'successfully',
  },
  204: {
    description: 'No Content related to the ID provided',
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
};


export default {
    "/api/v1/products/add" : {
        post: {
          tags: ["Product"],
          description: " Product ",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: addResponses
        },
      },

    "/api/v1/product/images/add" : {
      post: {
        tags: ["Product"],
        description: " Product attr ",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/ProductImage",
              },
            },
          },
        },
        responses: addResponses
      },
    },


    "/api/v1/product/variation/add" : {
      post: {
        tags: ["Product"],
        description: "Product attr",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/ProductAttribute",
              },
            },
          },
        },
        responses: addResponses
      },
    },

    "/api/v1/product" : {
      get: {
        tags: ["Product"],
        summary: "search product",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            "in": "query",
          "name": "q",
           required: true,
         }
        ],
        responses: addResponses
      },
    },

    "/api/v1/product/images/add" : {
      post: {
        tags: ["Product"],
        description: " Product attr ",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/ProductImage",
              },
            },
          },
        },
        responses: addResponses
      },
    },


    "/api/v1/product/variation/add" : {
      post: {
        tags: ["Product"],
        description: "Product attr",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/ProductAttribute",
              },
            },
          },
        },
        responses: addResponses
      },
    },

    '/api/v1/products/delete/{id}': {
      delete: {
        tags: ['Product'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'product id',
            required: true,
            type: 'string',
            example: '3e7b7d4f-d9d0-4ee2-8413-5df9c4ec6491',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
          500: {
            description: 'Internal Server Error',
          },
          404: {
            description: 'not found',
          },
          401: {
            description: "Not Authorized",
          },
          403: {
            description: "Forbidden Access",
          },
        },
      },
    },

    '/api/v1/products/update/{id}': {
      put: {
        tags: ['Product'],
        description: ' Product ',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        responses: updateResponses,
      },
    },


  '/api/v1/product/images/update/{id}': {
    put: {
      tags: ['Product Images'],
      description: ' Product Images ',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
        },
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/ProductImage',
            },
          },
        },
      },
      responses: updateResponses,
    },
  },


  '/api/v1/product/variation/update/{id}': {
    put: {
      tags: ['Product Attributes'],
      description: 'Product attr',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
        },
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/ProductAttribute',
            },
            default: {
              id: '1',
            },
          },
        },
      },
      responses: updateResponses,
    },
  },
    }

    