'use strict';
const Category = require('../models/category');
const User = require('../models/user');
const Joi = require('joi');

const Categories = {
  home: {
    handler: function(request, h) {
      return h.view('category', { title: 'Add a Category' });
    }
  },
  report: {
    handler: async function(request, h) {
      const categories = await Category.find()
      return h.view('categoryreport', {
          title: 'Categories',
          categories: categories
      });
    }
  },
  addCategory: {
    handler: async function(request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newCategory = new Category({
        category_name: data.category_name,
        category_location: data.category_location,
        editor: user._id
      });
      await newCategory.save();
      return h.redirect('/categoryreport');
    }
  }
};

module.exports = Categories;
