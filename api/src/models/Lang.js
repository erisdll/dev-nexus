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
  imgURL: {
    type: String,
    required: true,
  },

  // Array fields
  characteristics: {
    type: [String],
    required: true,
    maxlength: 50,
    required: true,
  },
  platforms: {
    type: [String],
    maxlength: 50,
    required: true,
  },
  bestFor: {
    type: [String],
    maxlength: 100,
    required: true,
  },
  advantages: {
    type: [String],
    maxlength: 100,
    required: true,
  },
  disadvantages: {
    type: [String],
    maxlength: 100,
    required: true,
  },
  designedBy: {
    type: [String],
    required: true,
  },

  // Aditional fields
  yearCreated: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
  },
  tags: {
    type: String,
  },
  popularity: {
    type: Number,
    default: 0,
  },
});

const Lang = mongoose.model('Lang', langSchema);

module.exports = Lang;