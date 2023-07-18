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
      ref: 'Area',
    },
  ],
});

const Tech = mongoose.model('Tech', techSchema);

module.exports = Tech;
