
const itemService = require('./services/item');
const graphQLService = require('./services/graphql');

const item = itemService();
const graphql = graphQLService({ itemService: item });

module.exports.handler = (event, context, cb) => {
  console.log('Received event', event);

  return graphql.runQuery(event.body.query)
    .then((response) => cb(null, response))
    .catch((err) => cb(err));
};
