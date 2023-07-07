const mongoose = require('mongoose');

const langSchema = new mongoose.Schema({
  // Main Fields
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true,
  },

  // Array fields
  platforms: {
    type: [String],
    maxlength: 50,
    max: 10,
    required: true,
  },
  bestFor: {
    type: [String],
    maxlength: 100,
    max: 10,
    required: true,
  },
  advantages: {
    type: [String],
    maxlength: 100,
    max: 10,
    required: true,
  },
  disadvantages: {
    type: [String],
    maxlength: 100,
    max: 10,
    required: true,
  },
  designedBy: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },

  // Number fields
  yearCreated: {
    type: Number,
    required: true,
  },
  popularity: {
    type: Number,
    default: 0,
  },
});

const Lang = mongoose.model('Lang', langSchema);

module.exports = Lang;