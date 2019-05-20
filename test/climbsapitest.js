'use strict';

const assert = require('chai').assert;
const ClimbService = require('./climb-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Climb API tests', function() {
  let climbs = fixtures.climbs;
  let newCategory = fixtures.newCategory;

  const climbService = new ClimbService('http://localhost:3000');

  setup(async function () {
    await climbService.deleteAllCategories();
    await climbService.deleteAllClimbs();
  });

  teardown(async function () {  });

  test('create a climb', async function() {
    const returnedCategory = await climbService.createCategory(newCategory);
    await climbService.makeClimb(returnedCategory._id, climbs[0]);
    const returnedClimbs = await climbService.getClimbs(returnedCategory._id);
    assert.equal(returnedClimbs.length, 1);
    assert(_.some([returnedClimbs[0]], climbs[0]), 'returned climb must be a superset of climb');
  });

  test('create multiple climbs', async function() {
    const returnedCategory = await climbService.createCategory(newCategory);
    for (var i = 0; i < climbs.length; i++) {
      await climbService.makeClimb(returnedCategory._id, climb[i]);
    }

    const returnedClimbs = await climbService.getClimbs(returnedCategory._id);
    assert.equal(returnedClimbs.length, climbs.length);
    for (var i = 0; i < climbs.length; i++) {
      assert(_.some([returnedClimbs[i]], climbs[i]), 'returned climb must be a superset of climb');
    }
  });

  test('delete all climbs', async function() {
    const returnedCategory = await climbService.createCategory(newCategory);
    for (var i = 0; i < climbs.length; i++) {
      await climbService.makeClimb(returnedCategory._id, climbs[i]);
    }

    const d1 = await climbService.getClimbs(returnedCategory._id);
    assert.equal(d1.length, climbs.length);
    await climbService.deleteAllClimbs();
    const d2 = await climbService.getClimbs(returnedCategory._id);
    assert.equal(d2.length, 0);
  });

  test('delete climbs', async function () {
    const returnedCategory = await climbService.createCategory(newCategory);
    for (var i = 0; i < climbs.length; i++) {
      await climbService.makeClimb(returnedCategory._id, climbs[i]);
    }

    climbService.deleteClimbs(returnedCategory._id);
    const d = await climbService.getClimbs(returnedCategory._id);
    console.log(d);
    assert.equal(d.length, 0);
  });


});