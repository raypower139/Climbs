'use strict';

const Category = require('../models/category');
const Boom = require('boom');

const Categories = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const categories = await Category.find();
      return categories;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
      const categories = await Category.findOne({ _id: request.params.id });
      if (!categories) {
        return Boom.notFound('No Category with this id');
      }
      return categories;
    } catch (err) {
        return Boom.notFound('No Category with this id');
      }
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newCategory = new Category(request.payload);
      const category = await newCategory.save();
      if (category) {
        return h.response(category).code(201);
      }
      return Boom.badImplementation('error creating category');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Category.deleteMany({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await Category.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }

};

module.exports = Categories;