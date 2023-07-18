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
  bio: {
    type: String,
    minlength: 100,
    maxlength: 1000,
    trim: true,
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
  selectedAreas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Area',
    },
  ],

  // Control fields
  // (usr/mod/adm)
  role: {
    type: String,
    default: 'user',
  },

  deactivated: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
