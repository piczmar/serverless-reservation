/**
 * Provides methods for Items.
 */
const stampit = require('stampit');
const Logger = require('../logger');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const itemsTable = 'Items';

const ItemService = stampit()
    .methods({
        findByName(name) {

            return new Promise(function (resolve, reject) {
                console.log("findByName: ", name);
                var params = {
                    TableName : itemsTable,
                    ProjectionExpression:"id, #name, description, createdAt, updatedAt",
                    FilterExpression: "begins_with (#name, :name_substr)  ",
                    ExpressionAttributeNames:{
                        "#name": "name"
                    },
                    ExpressionAttributeValues: {
                        ":name_substr":name
                    }
                };
                //TODO: using scan on large data sets is inefficient - consider replacing with query, but then need to add indexes
                dynamoDb.scan(params, function(err, data) {
                    console.log("DYNAMO ERR: ",err);
                    console.log("DYNAMO RESP: ",data);
                    if (err) return reject(err);
                    return resolve(data);
                });

            })
                .then((resp) => this.logResults(resp))
                .then((resp) => this.convertResults(resp.Items))
                .catch((err) => {
                    this.log('Error running query', err);
                    throw err;
                });
        },
        createItem(item) {
            console.log("Received item: ", item);

            return new Promise(function(resolve, reject) {

                const currentTime = new Date().getTime();
                item.id = uuid.v1();
                item.createdAt = currentTime;
                item.updatedAt = currentTime;

                var params = {
                    TableName: itemsTable,
                    Item: item
                };

                dynamoDb.put(params, function(err, data) {
                    if (err) return reject(err);
                    return resolve(item);
                });

            });

        },
        logResults(resp) {
            this.log('Resp: ',resp);
            this.log('Created at: ', resp.createdAt);
            this.log('Name: ', resp.name);
            return resp;
        },

        convertResults(items) {
            const result = items.map(item => {
                return {
                    name: item.name,
                    description: item.description,
                    createdAt: item.createdAt
                };
            });
            return result;
        },
    })
    .compose(Logger);

module.exports = ItemService;
