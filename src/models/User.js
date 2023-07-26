const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Main fields
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (username) {
        return !/\s/.test(username);
      },
      message: 'Usernames cannot contain spaces!',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (pass) {
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(pass);
      },
      message:
        'Password must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    maxlength: 100,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
    minlength: 50,
    maxlength: 1000,
    trim: true,
    default:
      "Hi, I'm a DevNexus user! I love coding and learning new technologies. :)",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  deactivated: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
