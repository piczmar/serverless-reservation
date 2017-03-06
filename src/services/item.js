
const stampit = require('stampit');
const Logger = require('../logger');

const ItemService = stampit()
  .methods({
    findByName(name) {

      return new Promise(function(resolve, reject) {

          //TODO: for now we just return static response,
          // in future we want to get it from database
          var demoResp = {
            Count : 1,
            Items : [
              {
                createdAt: new Date(),
                name : 'item name',
                description: ' a demo item'
              }
            ]
          };
          resolve(demoResp);

        })
        .then((resp) => this.logResults(resp))
        .then((resp) => this.convertResults(resp.Items))
        .catch((err) => {
          this.log('Error running query', err);
          throw err;
        });
    },

    logResults(resp) {
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
