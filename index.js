
const itemService = require('./src/services/item');
const graphQLService = require('./src/services/graphql');

const serviceInstance = itemService();
const graphql = graphQLService({ itemService: serviceInstance });

module.exports.graphql = (event, context, cb) => {
    console.log('Received event', event);

    return graphql.runGraphQL(event.body.query)
        .then((response) => cb(null, response))
        .catch((err) => cb(err));
};
