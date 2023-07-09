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
    maxlength: 1000,
    required: true,
    unique: true,
  },
  imgUrl: {
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

const Area = mongoose.Model('Area', areaSchema);
