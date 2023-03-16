export default {
    "/api/v1/email" : {
        post: {
          tags: ["Auth"],
          summary: "User email verification for password reset",
          security: [],
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                example: {
                  
                  email: "example@gmail.com",
                  
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
      "/api/v1/password/{token}" : {
        post: {
          tags: ["Auth"],
          summary: " password reset",
          parameters: [
            {
               "in": "path",
             "name": "token",
              required: true,
            }
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                example: {
                  
                  password: "example",
                  
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