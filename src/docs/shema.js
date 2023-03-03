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
      email: {
        type: 'string',
        description: 'user email',
      },
    },
  },
};
