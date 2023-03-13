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
              names: "Ana10 user",
              email: "aimeantholex@gmail.com",
              password: "123456",
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