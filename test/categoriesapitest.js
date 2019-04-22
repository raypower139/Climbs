'use strict';

const _ = require('lodash');
const assert = require('chai').assert;
const ClimbService = require('./climb-service');
const fixtures = require('./fixtures.json');

suite('Categories API tests', function () {

  let categories = fixtures.categories;
  let newCategory = fixtures.newCategory;

  const climbService = new ClimbService('http://localhost:3000');

  setup(async function () {
    await climbService.deleteAllCategories();
  });

  teardown(async function () {
    await climbService.deleteAllCategories();
  });

  test('create a category', async function () {
    const returnedCategory = await climbService.createCategory(newCategory);
    assert(_.some([returnedCategory], newCategory),'returnedCategory must be a superset of newCategory');
    assert.isDefined(returnedCategory._id);
  });

  test('get category', async function () {
    const c1 = await climbService.createCategory(newCategory);
    const c2 = await climbService.getCategory(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid category', async function () {
    const c1 = await climbService.getCategory('1234');
    assert.isNull(c1);
    const c2 = await climbService.getCategory('012345678901234567890123');
    assert.isNull(c2);
  });

  test('delete a category', async function () {
    let c = await climbService.createCategory(newCategory);
    assert(c._id != null);
    await climbService.deleteOneCategory(c._id);
    c = await climbService.getCategory(c._id);
    assert(c == null);
  });

  test('get all categories', async function () {
    for (let c of categories) {
      await climbService.createCategory(c);
    }

    const allCategories = await climbService.getCategories();
    assert.equal(allCategories.length, categories.length);
  });

  test('get categories detail', async function () {
    for (let c of categories) {
      await climbService.createCategory(c);
    }

    const allCategories = await climbService.getCategories();
    for (var i = 0; i < categories.length; i++) {
      assert(_.some([allCategories[i]], categories[i]), 'returnedCategory must be a superset of newCategory');
    }
  });

  test('get all categories empty', async function () {
    const allCategories = await climbService.getCategories();
    assert.equal(allCategories.length, 0);
  });

});