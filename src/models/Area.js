const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  // Main Fields
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    minlength: 100,
    maxlength: 1000,
    required: true,
    trim: true,
  },
  imgURL: {
    type: String,
    required: true,
  },

  // Array fields
  keyFeatures: {
    type: [String],
    maxlength: 100,
    required: true,
  },
  useCases: {
    type: [String],
    required: true,
    maxlength: 100,
  },

  // Aditional Fields
  popularity: {
    type: Number,
    default: 0,
    max: 100,
  },

  // Selections
  langs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lang',
    },
  ],
  techs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tech',
    },
  ],
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;