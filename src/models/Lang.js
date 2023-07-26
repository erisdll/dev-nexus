const mongoose = require('mongoose');

const langSchema = new mongoose.Schema({
  // Main Fields
  name: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function isCapitalized(name) {
        const words = name.trim().split(/\s+/);
        for (const word of words) {
          if (!word[0].match(/^[A-Z]/)) {
            return false;
          }
        }
        return true;
      },
      message: 'Name must have the first letter capitalized.',
    },
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
  advantages: {
    type: [
      {
        type: String,
        maxlength: 100,
        trim: true,
      },
    ],
    validate: {
      validator: function (value) {
        return value.length >= 5;
      },
      message: 'There should be at least 5 advantages.',
    },
    required: true,
  },
  disadvantages: {
    type: [
      {
        type: String,
        maxlength: 100,
        trim: true,
      },
    ],
    validate: {
      validator: function (value) {
        return value.length >= 5;
      },
      message: 'There should be at least 5 disadvantages.',
    },
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
    max: 100,
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
