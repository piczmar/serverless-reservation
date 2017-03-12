import { graphql } from 'graphql';
import Schema from './schema';

export function runGraphQL(event, cb) {

    let query = event.body.query;

    // patch to allow queries from GraphiQL
    // like the initial introspectionQuery
    if (event.body.query && event.body.query.hasOwnProperty('query')) {
        query = event.body.query.query.replace("\n", ' ', "g");
    }

    graphql(Schema, query).then( function(result) {
        //console.log('RESULT: ', result);
        return cb(null, result);
    });

}