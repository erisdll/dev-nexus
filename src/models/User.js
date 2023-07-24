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
    minlength: 50,
    maxlength: 1000,
    trim: true,
    default: "Hi, I'm a DevNexus user! I love coding and learning new technologies. :)"
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
  isAdmin: {
    type: Boolean,
    default: false,
  },

  deactivated: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
