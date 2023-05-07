export default {
  User: {
    type: 'object',

    properties: {
      id: {
        type: 'uuid',
        description: 'The auto-generated id ',
      },
      names: {
        type: 'string',
        description: 'name name',
      },
      status: {
        type: 'string',
        description: 'user email',
      },
      password: {
        type: 'string',
        description: 'user password //hidden',
      },
      role: { type: 'string', description: 'user role in dbs' },
      phone: {
        type: 'string',
        description: 'user phone number',
      },
      permissions: {
        type: 'Array(string)',
        description: 'describes the permissions ceratain users have',
      },
    },
  },
  Category: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'name of the category',
      },
    },
  },
  Product: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'name of the product',
      },
      image: {
        type: 'string',
        description: 'Product image',
        format: 'binary',
      },
      description: {
        type: 'string',
        description: ' Product description',
      },
      keyword: {
        type: 'string',
        description: ' keywords for product easy seachability',
      },
      model: {
        type: 'string',
        description: 'Product Model',
      },
      status: {
        type: 'string',
        description: ' status for product ',
      },
      categoryId: {
        type: 'integer',
        description: ' category that product belongs to',
      },
      expiryDate: {
        type: 'string',
        format: 'date-time',
        description: 'Expiration date of the product'
      }
    },
  },
  

  ProductAttribute: {
    type: 'object',
    properties: {
      price: {
        type: 'integer',
        description: ' product price',
      },
      varitationName:{
        type: 'string',
        description: ' product variation name',
      },
      size: {
        type: 'string',
        description: ' product size',
      },

      color: {
        type: 'string',
        description: ' product color value',
      },
      productId: {
        type: 'string',
        description: ' product identifier',
      },
      attrImage: {
        type: 'string',
        description: 'products attribute image',
        format: 'binary',
      },
      quantity: {
        type: 'integer',
        description: 'product quantity',
      },
    },
  },

  ProductImage: {
    type: 'object',
    properties: {
      prodImage: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
        description: 'Product images in binary format',
      },
      productId: {
        type: 'string',
        description: 'product Id',
      },
      status: {
        type: 'string',
        description: 'image status',
      },
    },
  },
  shoppingCart: {
    type: 'object',
    properties: {
      productId: {
        type: 'string',
        description: 'product attribute Id',
      },
    },
  },
  chat: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'type a message',
      },
    },
  },
  Coupon: {
    type: 'object',
    properties: {
      discount_rate: {
        type: 'integer',
        description: ' Discount rate ',
        minimum: 1,
        maximum: 100
      },
      expire_at: {
        type: 'string',
        description: 'Will be valueing until ',
        format: 'date-time',
      },
      max_usage: {
        type: 'integer',
        description: 'Maximum number usage possible',
      },
      usage: {
        type: 'integer',
        description: 'Maximum used',
      },
      productAttributes: {
        type: 'Array(integer)',
        description: 'Array of product attributes',
        default: ['1']
      },
      status: {
        type: 'string',
        "enum": ["ACTIVE", "INACTIVE"],
        description: ' status for product ',
      }
    },
  },
  
  ProductRating: {
    type: 'object',
    properties: {
      rating: {
        type: 'integer',
        description: ' rating for product ',
        minimum: 1,
        maximum: 5,
        default: 3
      },
      comment: {
        type: 'string',
        description: ' comment for product ',
      },
      productId: {
        type : 'uuid',
        description: ' product id for product being reted',
        example: 'product',
      }
    }
  }
};