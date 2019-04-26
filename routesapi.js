const Categories = require('../Climbs/app/api/categoriesapi');
const Users= require('./app/api/users');
const Climbs = require('./app/api/climbsapi');

module.exports = [
  { method: 'GET', path: '/api/categoriesapi', config: Categories.find },
  { method: 'GET', path: '/api/categoriesapi/{id}', config: Categories.findOne },
  { method: 'POST', path: '/api/categoriesapi', config: Categories.create },
  { method: 'DELETE', path: '/api/categoriesapi/{id}', config: Categories.deleteOne },
  { method: 'DELETE', path: '/api/categoriesapi', config: Categories.deleteAll },

  /* Users */
  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  /* Climbs */
  { method: 'GET', path: '/api/climbsapi', config: Climbs.findAll },
  { method: 'GET', path: '/api/categoriesapi/{id}/climbs', config: Climbs.findByCategory },
  { method: 'POST', path: '/api/categoriesapi/{id}/climbs', config: Climbs.addClimb },
  { method: 'DELETE', path: '/api/climbsapi', config: Climbs.deleteAll }
];

