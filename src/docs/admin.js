const user = {
  firstname: 'kevchecho',
  lastname: 'idow',
  email: 'hsdggd@bff.com',
  password: 'pasmegaround',
  phone: '0787882105',
  permissions: [
    'add product',
    'add vendor',
    'add buyer',
    'remove vendor',
    'remove product',
  ],
};
export default {
  '/api/admin/users': {
    get: {
      tags: ['admin'],
      description:
        'this endpoint is defined with the get HTTP method and returns a list of all users in the database. The endpoint is tagged as being only accessible to admin users and has no parameters. The response contains an HTTP status code of 200 with a JSON content-type and an array schema that defines the shape of the returned user data.',

        parameters: [],
      responses: {
        200: {
          description: 'ok',
          content: {
            'application/json': {
              schema: {
                type: 'Object',
                example: [user],
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['admin'],
      description:
        "this endpoint is defined with the post HTTP method and allows the creation of a new admin. The endpoint is also tagged as being only accessible to admin users and requires a request body with the user's details, such as first name, last name, email, password, phone, and permissions. The request body schema is defined using an object with properties that match the user details, each with its own type, description, and example value",
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstname: {
                  type: 'string',
                  description: 'firstname',
                  example: 'kevchecho',
                },
                lastname: {
                  type: 'string',
                  description: 'lastname',
                  example: 'rustage',
                },
                email: {
                  type: 'string',
                  description: 'email',
                  example: 'hsdggd@bff.com ',
                },
                password: {
                  type: 'string',
                  description: 'password',
                  example: 'pasword ',
                },
                phone: {
                  type: 'string',
                  description: 'phone',
                  example: '250787882105',
                },
                permissions: {
                  type: 'string',
                  description: 'title',
                  example: [
                    'add product',
                    'add vendor',
                    'add buyer',
                    'remove vendor',
                    'remove product',
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'ok',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  message: 'admin added',
                  status: 'success',
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/admin/users/{id}': {
    get: {
      tags: ['admin'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'user id',
          required: true,
          type: 'string',
          example: '3e7b7d4f-d9d0-4ee2-8413-5df9c4ec6491',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          constent: {
            'application/json': {
              schema: {
                type: 'object',
                example: user,
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['admin'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'user id',
          required: true,
          type: 'string',
          example: '3e7b7d4f-d9d0-4ee2-8413-5df9c4ec6491',
        },
      ],
      responses: {
        204: {
          description: 'OK',
        },
        500: {
          description: 'Internal Server Error',
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
  '/api/vendor/users': {
    post: {
      tags: ['admin'],
      description:
        "this endpoint is defined with the post HTTP method and allows the creation of a new Vendor. The endpoint is also tagged as being only accessible to admin users and requires a request body with the user's details, such as first name, last name, email, password, phone, and permissions. The request body schema is defined using an object with properties that match the user details, each with its own type, description, and example value",
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstname: {
                  type: 'string',
                  description: 'firstname',
                  example: 'kevchecho',
                },
                lastname: {
                  type: 'string',
                  description: 'lastname',
                  example: 'rustage',
                },
                email: {
                  type: 'string',
                  description: 'email',
                  example: 'koksa@gmail.com ',
                },
                password: {
                  type: 'string',
                  description: 'password',
                  example: 'pasword ',
                },
                phone: {
                  type: 'string',
                  description: 'phone',
                  example: '250787882105',
                },
                permissions: {
                  type: 'string',
                  description: 'title',
                  example: [
                    'add product',
                    'add vendor',
                    'add buyer',
                    'remove vendor',
                    'remove product',
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'success',
        },
        500: {
          description: "Internal Server Error",
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

  '/api/v1/users':  {
    put:  {
      tags: ['user'],
      description:
        "This endpoint allows the authenticated user to update their own profile. The request body should include any fields that the user wishes to update. The 'id' parameter should match the ID of the authenticated user. The timestamp associated with the user's profile will be automatically updated upon each update.",
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstname: {
                  type: 'string',
                  description: 'First name',
                  example: 'John',
                },
                lastname: {
                  type: 'string',
                  description: 'Last name',
                  example: 'Doe',
                },
                email: {
                  type: 'string',
                  description: 'Email address',
                  example: 'johndoe@example.com',
                },
                password: {
                  type: 'string',
                  description: 'Password',
                  example: 'newpassword',
                },
                phone: {
                  type: 'string',
                  description: 'Phone number',
                  example: '+1 (123) 456-7890',
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'User profile updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Success message',
                    example: 'User profile updated successfully',
                  },
                  status: {
                    type: 'string',
                    description: 'Status of the operation',
                    example: 'success',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'Authentication failed',
                  },
                  status: {
                    type: 'string',
                    description: 'Status of the operation',
                    example: 'error',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'User not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'User not found',
                  },
                  status: {
                    type: 'string',
                    description: 'Status of the operation',
                    example: 'error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstname: {
                  type: 'string',
                  description: 'firstname',
                  example: 'kevchecho',
                },
                lastname: {
                  type: 'string',
                  description: 'lastname',
                  example: 'rustage',
                },
                email: {
                  type: 'string',
                  description: 'email',
                  example: 'koksa@gmail.com ',
                },
                password: {
                  type: 'string',
                  description: 'password',
                  example: 'pasword ',
                },
                phone: {
                  type: 'string',
                  description: 'phone',
                  example: '250787882105',
                },
                permissions: {
                  type: 'string',
                  description: 'title',
                  example: [
                    'add product',
                    'add vendor',
                    'add buyer',
                    'remove vendor',
                    'remove product',
                  ],
                },
              
      responses: {
        201: {
          description: 'success',
        },
        
        500: {
          description: "Internal Server Error",
        },

        401: {
          description: "Not Authorized",
        },
        403: {
          description: "Forbidden Access",
        },
      },
    }}}}