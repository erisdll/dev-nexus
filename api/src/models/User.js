const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Main fields
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
    maxlength: 1000,
  },
  imgURL: {
    type: String,
  },

  // Selections
  selectedLangs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lang',
    },
  ],
  selectedTechs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tech',
    },
  ],
  selectedSkills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    },
  ],

  // Control fields
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },

  // Additional fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
