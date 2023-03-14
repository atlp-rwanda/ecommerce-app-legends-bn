export default {
  
    "/auth/google": {
      "get": {
        "tags": [
          "Authentication"
        ],
        "summary": "Authenticate with Google",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Redirect to the Google login page"
          }
        },
        "security": [
          {
            "google_auth": []
          }
        ]
      }
    },
    "/auth/google/redirect": {
      "get": {
        "tags": [
          "Authentication"
        ],
        "summary": "Google authentication redirect endpoint",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Redirect to the user's profile page"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "google_auth": []
          }
        ]
      }
    }
  }
  