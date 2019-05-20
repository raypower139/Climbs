'use strict';

const assert = require('chai').assert;
const ClimbService = require('./climb-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Category API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const climbService = new ClimbService(fixtures.climbService);

  setup(async function () {
    await climbService.deleteAllUsers();
  });

  test('verify Token', async function () {
    const returnedUser = await climbService.createUser(newUser);
    const response = await climbService.authenticate(newUser);

    const userInfo = utils.decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});