'use strict';
const Climb = require('../models/climb');
const User = require('../models/user');
const Category = require('../models/category');
const Joi = require('joi');
const fs = require('fs');

const Climbs = {
  home: {
    handler: async function(request, h) {
      const categories = await Category.find();
      return h.view('home', {
        title: 'Add a Climb',
        categories: categories
      });
    }
  },

  admin: {
    handler: async function(request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      return h.view('admin', { title: 'Administration Panel', user: user });
    }
  },

  report: {
    handler: async function(request, h) {

      const climbs = await Climb.find().populate('editor').populate('category');
      return h.view('report', {
        title: 'Climbs in South East',
        climbs: climbs

      });
    }
  },

  addClimb: {

    validate: {
      payload: {
        climb_name: Joi.string().required(),
        climb_description: Joi.string().required(),
        climb_lat: Joi.number().required(),
        climb_long: Joi.number().required(),
        category: Joi.string().required(),

      },
      options: {
        abortEarly: false,
      },
      failAction: function(request, h, error) {
        return h
          .view('home', {
            title: 'Add Climb error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const rawCategory = request.payload.category.split(',');
        const category = await Category.findOne({
          category_name: rawCategory[0],
          category_location: rawCategory[1]
        });

        const newClimb = new Climb({
          climb_name: data.climb_name,
          climb_description: data.climb_description,
          climb_lat: data.climb_lat,
          climb_long: data.climb_long,
          editor: user._id,
          category: category._id,
        });
        await newClimb.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('report', { errors: [{ message: err.message }] });
      }
    }
  },

  viewClimb: {
    handler: async function(request, h) {
      const id = request.params.id;
      const climb = await Climb.findById(id).populate('editor').populate('category');
      //Log the id
      console.log(id);
      return h.view('viewClimb', { title: 'Climbs Settings', climb: climb });
    }
  },

  editClimb: {
    handler: async function(request, h) {
      const id = request.params.id;
      const climb = await Climb.findById(id);
      console.log(id);
      return h.view('editClimb', { title: 'Edit Climb', climb: climb });
    }
  },

  updateClimb: {
    handler: async function(request, h) {
      const climbEdit = request.payload;
      climb.climb_name = climbEdit.climb_name;
      climb.climb_description = climbEdit.climb_description;
      climb.climb_lat = climbEdit.climb_lat;
      climb.climb_long = climbEdit.climb_long;
      climb.editor = climbEdit.editor;
      climb.category = climbEdit.category;
      await climb.save();
      console.log(id);
      return h.redirect('/home');
    }
  },


  deleteClimb: {

    handler: async function(request, h) {
      const id = request.params.id;
      const climb = await Climb.findOneAndDelete(id);
      //Log the id
      console.log(id);
      await climb.remove();
      return h.view('report');
    }
  },

};

module.exports = Climbs;
