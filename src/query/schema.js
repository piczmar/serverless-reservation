
const graphql = require('graphql');

const itemFactory = require('./item');

module.exports = (itemService) => {
  const schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
      name: 'Root',
      description: 'Root of the Schema',
      fields: {
        item:itemFactory(itemService),
      },
    }),
  });

  return schema;
};
