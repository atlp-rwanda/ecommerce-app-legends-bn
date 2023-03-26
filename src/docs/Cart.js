export default {
  "/api/v1/shoppingCart/add": {
    post: {
      tags: ["Shopping Cart"],
      description: "shopping cart",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/shoppingCart",
            },
          },
        },
      },
      responses: {
        201: {
          description: "successfully",
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

  "/api/v1/shoppingCart/view": {
    get: {
      tags: ["Shopping Cart"],
      description: "Viewing All Carts",
      parameters: [],
      requestBody: {},
      responses: {
      
        201: {
          description: "Viewing Cart",
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

  }
}


