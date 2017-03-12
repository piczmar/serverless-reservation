'use strict';

// Require Logic
var app = require('./src');

// AWS Lambda handler
module.exports.graphql = (event, context, cb) => {
    console.log('Received event', event);

    // return app.runQuery(event.body.query)
    //     .then((response) => cb(null, response))
    //     .catch((err) => cb(err));

    app.runGraphQL(event, function(error, response) {
        return context.done(error, response);
    });
};

