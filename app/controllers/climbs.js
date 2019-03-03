'use strict';
const Climb = require('../models/climb');
const User = require('../models/user');
const Category = require('../models/category');
const Joi = require('joi');

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
        category: Joi.string().required()
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
      try{
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
        category: category._id

      });
      await newClimb.save();
      return h.redirect('/report');
    }catch(err){
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  viewClimb: {
    handler: async function(request, h) {
      const id = request.params.id;
      const climb = await Climb.findById(id).populate('editor').populate('category');
      //Log the id
      console.log(id);
        return h.view('updateClimb', { title: 'Climbs Settings', climb: climb});
      }
  },

  updateClimb: {
    handler: async function(request, h) {
      const climbEdit = request.payload;
      const id = request.auth.credentials.id;
      const climb = await Climb.findOne(id);
      climb.climb_name = climbEdit.climb_name;
      climb.climb_description = climbEdit.climb_description;
      climb.climb_lat = climbEdit.climb_lat;
      climb.climb_long = climbEdit.climb_long;
      await climb.save();
      return h.redirect('updateClimb', { title: 'Administration Panel', climb: climb });
    }
  },

  /*
    Delete point of interest function
    Calling the method deleteById from poi.js
     */
  deleteClimb: {

    handler: async function(request, h){

      await Climb.deleteOne(request.params.id);
      //Log the id
      console.log(id);
      return h.redirect('/report');

    }

  },


};

module.exports = Climbs;
