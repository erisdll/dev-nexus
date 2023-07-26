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
    type: [
      {
        type: String,
        validate: {
          validator: function (value) {
            return !/\s/.test(value);
          },
          message: 'Cannot contain spaces!',
        },
      },
    ],
    validate: [
      {
        validator: function (value) {
          return value.length >= 5;
        },
        message: 'There should be at least 5 key features.',
      },
    ],
    maxlength: 32,
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