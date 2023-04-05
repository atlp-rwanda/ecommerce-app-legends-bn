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
    

      "/api/v1/users/password/update": {
        put: {
          tags: ["Auth"],
          summary: "Update user password",
          description: "This endpoint allows a logged-in user to update their password.",
          security: [
            {
              bearerAuth: [],
            }
          ],
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                example: {
                  "existingPassword": "oldPassword123",
                  "newPassword": "newPassword456" 
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "The password was successfully updated.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "success"
                      },
                      message: {
                        type: "string",
                        description: "A message indicating the password was updated successfully.",
                        example: "Password updated successfully."
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: "The request was invalid.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "fail"
                      },
                      message: {
                        type: "string",
                        description: "A message indicating the reason for the failure.",
                        example: "The request was invalid."
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: "The user is not authorized to perform this action.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        description: "The status of the response.",
                        example: "fail"
                      },
                      message: {
                        type: "string",
                        description: "A message indicating the reason for the authorization failure.",
                        example: "You are not authorized to perform this action."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    