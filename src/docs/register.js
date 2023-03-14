export default {
    "/api/v1/register" : {
        post: {
          tags: ["Auth"],
          description: "User registeration",
          security: [],
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                example: {
                  firstname: "Ana10 user",
                  lastname: "Ana10 user",
                  phone: "1234567890",
                  email: "example@gmail.com",
                  password: "12345678",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "New User was created successfully",
            },
            409: {
              description: {message: "User already exists"},
            },
            400: {
              description: "Bad Request, both fields are required",
            }
          },
        },
      },
    }