
'use strict';

const expect = require('chai').expect;
const BbPromise = require('bluebird');

const itemService = require('../../src/services/item');
const date1 = new Date('2016-08-01T22:16:43.642Z');
const date2 = new Date('2016-08-01T22:16:42.642Z');
const mockResponse = {
  Count: 2,
  Items: [
    {
      createdAt: date1.getTime(),
      name : 'item name1',
      description: ' a demo item 1'
    },
    {
      createdAt: date2.getTime(),
      name : 'item name2',
      description: ' a demo item 2'
    }
  ]
};


describe('ItemService', () => {

  describe('#convertResults()', () => {
    it('converts results', () => {
      const service = itemService();
      const results = service.convertResults(mockResponse.Items);

      expect(results).to.deep.equal([{
          name : 'item name1',
          description: ' a demo item 1',
          createdAt: date1.getTime()
      }, {
          name : 'item name2',
          description: ' a demo item 2',
          createdAt: date2.getTime(),
      }]);
    });
  });

  describe('#logResults()', () => {
    it('converts results', () => {
      const service = itemService();
      expect(() => service.logResults(mockResponse))
        .to.not.throw();
    });
  });
});
