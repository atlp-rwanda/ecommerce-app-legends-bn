export default {
    "/api/v1/seller/products": {
      get: {
        tags: ["Product"],
        description: "Retrieve a list of all items in a seller's collection",
        security: [
          {
            bearerAuth: [],
          },
        ],
  
        responses: {
          200: {
            description: "The list of items in the seller's collection",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "success",
                    },
                    message: {
                      type: "string",
                      example: "Items retrieved successfully",
                    },
                    items: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
      },
    },
  
     
    "/api/v1/buyer/products": {
      get: {
        tags: ["Product"],
        description: "Retrieve a list of all items available for purchase",
        responses: {
          200: {
            description: "The list of available items",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "success",
                    },
                    message: {
                      type: "string",
                      example: "Items retrieved successfully",
                    },
                    items: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Product",
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
           
          }  }}}}