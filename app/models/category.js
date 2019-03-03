'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = new Schema({
  category_name: String,
  category_location: String
});

module.exports = Mongoose.model('Category', categorySchema);