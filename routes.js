'use strict';

const Accounts = require('./app/controllers/accounts');
const Climbs = require('./app/controllers/climbs');
const Categories = require('./app/controllers/categories');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/signup', config: Accounts.showSignup },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/login', config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: 'GET', path: '/admin', config: Climbs.admin },
  { method: 'GET', path: '/home', config: Climbs.home },
  { method: 'GET', path: '/viewClimb', config: Climbs.viewClimb },
  { method: 'GET', path: '/category', config: Categories.home },
  { method: 'GET', path: '/report', config: Climbs.report },
  { method: 'GET', path: '/categoryreport', config: Categories.report },
  { method: 'POST', path: '/addClimb', config: Climbs.addClimb },
  { method: 'POST', path: '/addCategory', config: Categories.addCategory },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    },
    options: { auth: false }
  }

];
