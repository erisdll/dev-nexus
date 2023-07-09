const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
    selectedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
      },
    ],

    // Control fields
    timestamps: true,

    deactivated: {
      type: Boolean,
      default: false,
    },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
