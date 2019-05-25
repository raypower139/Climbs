'use strict';

const Boom = require('boom');
const Climb = require('../models/climb');
const Category = require('../models/category')

const Climbs = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const climbs = await Climb.find();
      return climbs;
    }
  },

  findByCategory: {
    auth: false,
    handler: async function(request, h) {
      const climbs = await Climb.find({ category: request.params.id });
      return climbs;
    }
  },

  /* Create a Climb and assign a Category to it */
  addClimb: {
    auth: false,
    handler: async function(request, h) {
      let climb = new Climb(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound('No Category with this id');
      }
      climb.category = category._id;
      climb = await climb.save();
      return climb;
    }
  },

  deleteClimbs: {
    auth: false,
    handler: async function(request, h) {
      await Climb.deleteMany({category: request.params.id });
      return { success: true };
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Climb.deleteMany({});
      return { success: true };
    }
  }

};

module.exports = Climbs;