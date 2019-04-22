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

  { method: 'POST', path: '/addCategory', config: Categories.addCategory },
  { method: 'GET', path: '/category', config: Categories.home },
  { method: 'GET', path: '/categoryreport', config: Categories.report },

  { method: 'GET', path: '/admin', config: Climbs.admin },
  { method: 'GET', path: '/home', config: Climbs.home },
  { method: 'GET', path: '/viewClimb{id}', config: Climbs.viewClimb },
  { method: 'GET', path: '/editClimb{id}', config: Climbs.editClimb },
  { method: 'POST', path: '/editClimb{id}', config: Climbs.updateClimb },
  { method: 'GET', path: '/report', config: Climbs.report },
  { method: 'POST', path: '/addClimb', config: Climbs.addClimb },
  { method: 'DELETE', path: '/deleteClimb{climb}', config: Climbs.deleteClimb },

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
