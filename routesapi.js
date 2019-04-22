const Categories = require('../Climbs/app/api/categoriesapi');

module.exports = [
  { method: 'GET', path: '/api/categoriesapi', config: Categories.find },
  { method: 'GET', path: '/api/categoriesapi/{id}', config: Categories.findOne },
  { method: 'POST', path: '/api/categoriesapi', config: Categories.create },
  { method: 'DELETE', path: '/api/categoriesapi/{id}', config: Categories.deleteOne },
  { method: 'DELETE', path: '/api/categoriesapi', config: Categories.deleteAll },
];

