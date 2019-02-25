'use strict';
const Climb = require('../models/climb');
const User = require('../models/user');

const Climbs = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Add a Climb' });
    }
  },
  report: {
    handler: async function(request, h) {
      const climbs = await Climb.find().populate('editor')
      return h.view('report', {
          title: 'Climbs in South East',
          climbs: climbs
      });
    }
  },
  addClimb: {
    handler: async function(request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newClimb = new Climb({
        climb_name: data.climb_name,
        climb_description: data.climb_description,
        climb_lat: data.climb_lat,
        climb_long: data.climb_long,
        category: data.category,
        editor: user._id
      });
      await newClimb.save();
      return h.redirect('/report');
    }
  }
};

module.exports = Climbs;
