
const itemService = require('./src/services/item');
const graphQLService = require('./src/services/graphql');

const serviceInstance = itemService();
const graphql = graphQLService({ itemService: serviceInstance });

module.exports.graphql = (event, context, cb) => {
    console.log('Received event', event);

    return graphql.runGraphQL(event.body)
        .then((response) => {
            console.log("Response: ",JSON.stringify(response));
            const newResponse = {
                statusCode: 200,
                body: JSON.stringify(response)
            };
            cb(null, newResponse)})
        .catch((err) => {
            console.log("Error: ", err);

            var myErrorObj = {
                errorType : "InternalServerError",
                httpStatus : 500,
                requestId : context.awsRequestId,
                message : "An unknown error has occurred. Please try again."
            };
            cb(JSON.stringify(myErrorObj))
        });
};
