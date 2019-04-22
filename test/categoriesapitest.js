'use strict';

const _ = require('lodash');
const assert = require('chai').assert;
const ClimbService = require('./climb-service');
const fixtures = require('./fixtures.json');

suite('Categories API tests', function () {

  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;

  const climbService = new ClimbService('http://localhost:3000');

  test('create a category', async function () {
    const returnedCategory = await climbService.createCategory(newCategory);
    assert(_.some([returnedCategory], newCategory),'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedCategory._id);
  });
});