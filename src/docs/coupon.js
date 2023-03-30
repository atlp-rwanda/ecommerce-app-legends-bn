const addResponses = {
    201: {
      description: 'successfully created',
    },
    204: {
      description: 'No Content related to the ID provided',
    },
    401: {
      description: 'User Not Authorized',
    },
    403: {
        description: " Forbidden",
    },
    404: {
      description: "Not found",
    },
    500: {
      description: 'Internal Server Error',
    },
  };
  
  const updateResponses = {
    200: {
      description: 'ok',
    },
    204: {
      description: 'No Content related to the ID provided',
    },
    401: {
      description: 'User Not Authorized',
    },
    404: {
      description: "Coupon doesn't exist!",
    },
    500: {
      description: 'Internal Server Error',
    },
  };
  
  
  export default {
      "/api/v1/coupons/add" : {
          post: {
            tags: ["Coupon"],
            description: " Coupon discounts",
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
                    $ref: "#/components/schemas/Coupon",
                  },
                },
              },
            },
            responses: addResponses
          },
        },

    "/api/v1/coupons/apply/coupon" : {
        post: {
          tags: ["Coupon"],
          description: " Coupon discounts",
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
                  
                    type: 'object',
                    properties: {
                      couponCode : {
                        type: 'string',
                        description: 'Coupon Code',
                      },
                    },
                  
                },
              },
            },
          },
          responses: addResponses
        },
      },

      "/api/v1/coupons/all" : {
        get: {
          tags: ["Coupon"],
          description: " Coupon discounts",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: updateResponses
        },
        description: 'All Coupons',
      }
    }