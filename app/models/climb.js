'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const climbSchema = new Schema({
  climb_name: String,
  climb_description: String,
  climb_lat: Number,
  climb_long: Number,
  editor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

module.exports = Mongoose.model('Climb', climbSchema);