export default {
'/api/v1/orderDetails/{trackingId}': {
    get: {
      summary: "Get order details by tracking number",
      tags: [
        "Order Details"
      ],
      parameters: [
        {
        in: "path",
          name: "trackingId",
        required: true,
          description: "Tracking number of the order to retrieve details for",
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        200: {
          description: 'Order details retrieved successfully',
          content: {
            "application/json":{
                schema: {
                    type: "object",
                    properties: {
                        data: {
                            type: "array",
                            items : {
                                $ref: "#/components/schemas/OrderDetails"
                            }
                        }
                    }
                }
            }
          }
        },
        404: {
          description: 'Order not found',
          "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "message": {
                            "type": "string",
                            "example": "Order not found"
                        }
                    }
                }
            }
        }   
        },
        500:{
          description:'internal server error',
          content:{
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "message": {
                            "type": "string",
                            "example": "Server error"
                        }
                    }
                }
            }
          }
        }
      },
    },
  },
};
  
  