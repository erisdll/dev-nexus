const mongoose = require('mongoose');

const langSchema = new mongoose.Schema({
  // Main Fields
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 1000,
    trim: true,
  },
  imgURL: {
    type: String,
    required: true,
  },

  // Array fields
  keyFeatures: {
    type: [String],
    maxlength: 50,
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
  popularity: {
    type: Number,
    default: 0,
  },

  // Selections
  areas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
    },
  ],
  techs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tech',
    },
  ],
});

const Lang = mongoose.model('Lang', langSchema);

module.exports = Lang;
