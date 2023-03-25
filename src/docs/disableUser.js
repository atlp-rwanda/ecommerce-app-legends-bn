export default {
    "/api/v1/users/{id}/disable": {
        "put": {
          "tags": [
            "admin"
          ],
          "summary": "Disable a user account",
          "description": "This endpoint disables the user account by setting their status to inactive and sending them an email notification.",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID of the user to disable",
              "required": true,
              "type": "integer"
            }
          ],
          "responses": {
            "200": {
              "description": "User account successfully disabled",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "success"
                  },
                  "message": {
                    "type": "string",
                    "example": "User disabled"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "fail"
                  },
                  "message": {
                    "type": "string",
                    "example": "Not authorized"
                  }
                }
              },

              "description": "Access denied",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "fail"
                  },
                  "message": {
                    "type": "string",
                    "example": "Access denied, dmin role required"
                  }
                }
              }
            },
           
            "403": {
              "description": "user already desabled",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "fail"
                  },
                  "message": {
                    "type": "string",
                    "example": "user already desabled"
                  }
                }
              }
            },

            "404": {
              "description": "User not found",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "fail"
                  },
                  "message": {
                    "type": "string",
                    "example": "User not found"
                  }
                }
              }
            }
          }
        }
      },
}