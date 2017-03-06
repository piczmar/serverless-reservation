'use strict';

const expect = require('chai').expect;

const graphQLService = require('../../src/services/graphql');

const date1 = new Date('2016-08-01T22:16:43.642Z');
const date2 = new Date('2016-08-01T22:16:43.641Z');

const mockData = [{
  createdAt: date1,
  name: 'item1',
}, {
  createdAt: date2,
  name: 'item2',
}];

describe('#handler()', () => {
  let graphql;

  beforeEach(() => {
    const itemService = {
      findByName() {
        return mockData;
      },
    };

    graphql = graphQLService({ itemService });
  });

  it('return data', () => {
    const query = `{
      item {
        name, createdAt
      }
    }`;

    return graphql.runQuery(query)
      .then((result) => {
        expect(result).to.deep.equal({
          data: {
            item: [{
              createdAt: date1.getTime(),
              name: 'item1',
            }, {
              createdAt: date2.getTime(),
              name: 'item2',
            }],
          },
        });
      });
  });
});
