/**
 * Defines GraphQL schema for Serverless Reservation application
 */

const graphql = require('graphql');

module.exports = (itemService) => {

    const Date = new graphql.GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return value; // value from the client
        },
        serialize(value) {
            return value; // value sent to the client
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
            id: {type: graphql.GraphQLString},
            name: {type: graphql.GraphQLString},
            description: {type: graphql.GraphQLString},
            createdAt: {type: Date}
        },
    });

    const Query = new graphql.GraphQLObjectType({
        name: 'Root',
        description: 'Root of the Schema',
        fields: () => ( {
            items: {
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
                }
            }
        })
    });

    const Mutation = new graphql.GraphQLObjectType({
        name: 'ItemMutations',
        fields: () => ( {
            createItem: {
                type: ItemType,
                description: "Create item for reservation",
                args: {
                    id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                    name: {type: graphql.GraphQLString},
                    description: {type: graphql.GraphQLString}
                },
                resolve: function (source, args) {
                    return itemService.createItem(args);
                }
            }
        })
    });


    const schema = new graphql.GraphQLSchema({
        query: Query,
        mutation: Mutation
    });

    return schema;
};






