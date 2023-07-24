const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Creates new user: verifies token,
// requires admin permission, destructures req data, hashes password.
// Saves user to DB, throws & catches errors if needed.
// -------------------
// -----> TO DO <-----
// -------------------

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      bio,
      selectedLangs,
      selectedTechs,
      selectedAreas,
      role,
      deactivated
    } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPass,
      bio,
      selectedLangs,
      selectedTechs,
      selectedAreas,
      role,
      deactivated
    });
    await newUser.save();
    res.status(201).json({
      status: 'success',
      message: 'Resource created successfully!',
      data: { newUser },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error!',
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (users.length === 0) {
      throw new Error('Not Found');
    }

    const userList = users.map(user => ({
      username: user.username,
      email: user.email,
      bio: user.bio,
      imgURL: user.imgURL
    }));

    res.status(200).json({
      status: 'success',
      data: { users: userList },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      { password: 0 },
    )
    .populate('selectedLangs')
    .populate('selectedAreas')
    .populate('selectedTechs');
    if (!user) {
      throw new Error('Not Found');
    }
    const userData = {
      username: user.username,
      email: user.email,
      bio: user.bio,
      imgURL: user.imgURL,
      selectedLangs: user.selectedLangs,
      selectedAreas: user.selectedAreas,
      selectedTechs: user.selectedTechs,
    };
    res.status(200).json({
      status: 'success',
      data: { userData },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'User not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.getUserSelections = async (req, res) => { 
  try {
    const username = req.params.username;
    const selection = req.query.items
    console.log(selection)
    const user = await User.findOne(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      { password: 0 },
    )
      .populate('selectedLangs')
      .populate('selectedAreas')
      .populate('selectedTechs');
    if (!user) {
      throw new Error('Not Found');
    }
    const selections = {
      selectedLangs: user.selectedLangs,
      selectedAreas: user.selectedAreas,
      selectedTechs: user.selectedTechs,
    };
    res.status(200).json({
      status: 'success',
      data: { selections },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'User not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
}

exports.updateUser = async (req, res) => { }

exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username
      .split('-')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Resource deleted successfully!',
      data: { deletedUser },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'Resource not deleted!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne()
      .populate('selectedLangs')
      .populate('selectedAreas')
      .populate('selectedTechs');
    if (!user) {
      throw new Error('Not Found');
    }
    const userData = {
      username: user.username,
      email: user.email,
      bio: user.bio,
      imgURL: user.imgURL,
      selectedLangs: user.selectedLangs,
      selectedAreas: user.selectedAreas,
      selectedTechs: user.selectedTechs,
    };
    res.status(200).json({
      status: 'success',
      data: { userData },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'User not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.updateUserProfile = async (req, res) => {}

exports.updatePassword = async (req, res) => {}

exports.deactivateAcc = async (req, res) => {}
