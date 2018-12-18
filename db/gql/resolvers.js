const query = require('qs-middleware');

module.exports = {
  resolvers: {
    Query: {
      hello: () => 'Hello world!',
    },
  },
};
