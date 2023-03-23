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

    }