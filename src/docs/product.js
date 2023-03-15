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
          responses: {
            200: {
              description: "successfully",
            },
            204: {
              description: "No Content related to the ID provided",
            },
            401: {
              description: "User Not Authorized",
            },
            404: {
              description: "Product doesn't exist!",
            },
            500: {
              description: "Internal Server Error",
            },
          },
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
        responses: {
          201: {
            description: "created",
          },
          204: {
            description: "No Content related to the ID provided",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Product doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
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
        responses: {
          201: {
            description: "created",
          },
          204: {
            description: "No Content related to the ID provided",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Product doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
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
          responses: {
            200: {
              description: "successfully",
            },
            204: {
              description: "No Content related to the ID provided",
            },
            401: {
              description: "User Not Authorized",
            },
            404: {
              description: "Product doesn't exist!",
            },
            500: {
              description: "Internal Server Error",
            },
          },
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
        responses: {
          201: {
            description: "created",
          },
          204: {
            description: "No Content related to the ID provided",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Product doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
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
        responses: {
          201: {
            description: "created",
          },
          204: {
            description: "No Content related to the ID provided",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Product doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
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
    }