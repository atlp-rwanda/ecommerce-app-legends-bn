export default {
    "/api/v1/category/add" : {
        post: {
          tags: ["Category"],
          description: "Category",
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
                  $ref: "#/components/schemas/Category",
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

    "/api/v1/category/all" : {
        get: {
          tags: ["Category"],
          description: "Category",
          security: [],
          parameters: [],
          requestBody: {},
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
    }


