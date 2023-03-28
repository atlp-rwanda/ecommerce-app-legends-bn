export default {
  User: {
    type: 'object',

    properties: {
      id: {
        type: 'string',
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
        description: ' Product description ',
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
    },
  },

  ProductAttribute: {
    type: 'object',
    properties: {
      price: {
        type: 'integer',
        description: ' product price',
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
  
};
