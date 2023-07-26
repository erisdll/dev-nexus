const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({
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
  areas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
    },
  ],
});

const Tech = mongoose.model('Tech', techSchema);

module.exports = Tech;
