'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const climbSchema = new Schema({
  climb_name: String,
  climb_description: String,
  climb_lat: Number,
  climb_long: Number,
  category: String,
  editor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Mongoose.model('Climb', climbSchema);