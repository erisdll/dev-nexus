const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // Main Fields
  username: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
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
  photo: {
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

  // Password Security
  password: {
    type: String,
    required: [true, 'Please enter your password!'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return el === el.password
      },
      message: 'Passwords do not match!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String, 
  passwordResetExpires: Date,

  // Control Fields
  role: {
    type: String,
    enum: ['user', 'mod', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
