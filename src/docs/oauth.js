export default {
    "schemes": [
        "http",
        "https"
      ],
    "/auth/google/redirect": {
      "get": {
        "tags": [
          "Auth"
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
  