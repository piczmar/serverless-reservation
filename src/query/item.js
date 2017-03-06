
const graphql = require('graphql');


const  Date = new graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === graphql.Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  });



const ItemType = new graphql.GraphQLObjectType({
  name: 'Item',
  fields: {
    name: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    createdAt: { type: Date }
  },
});


module.exports = (itemService) => ({
  name: 'ItemQuery',
  description: 'Retrieve items',
  type: new graphql.GraphQLList(ItemType),
  args: {
    name: {
      type: graphql.GraphQLString,
    }
  },
  resolve(_, args, ast) { // eslint-disable-line no-unused-vars
    return itemService.findByName(args.name);
  },
});
