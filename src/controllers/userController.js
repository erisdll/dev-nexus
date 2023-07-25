const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      fullName,
      location,
      bio,
      selectedLangs,
      selectedTechs,
      selectedAreas,
      isAdmin,
      deactivated
    } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      password: hashedPass,
      email,
      fullName,
      location,
      bio,
      selectedLangs,
      selectedTechs,
      selectedAreas,
      isAdmin,
      deactivated
    });
    
    const savedUser = await newUser.save();

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully!',
      data: { savedUser },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error!',
    });
  }
}; // DONE

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    if (users.length === 0) {
      throw new Error('Not Found');
    }

    const usersList = users.map(user => ({
      username: user.username,
      email: user.email,
      imgURL: user.imgURL
    }));

    return res.status(200).json({
      status: 'success',
      data: { users: usersList },
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
}; // DONE

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      {
        _id: 0, __v: 0, password: 0,
        isAdmin: 0, createdAt: 0,
        lastLogin: 0, deactivated: 0,
      },
    )
    .populate('selectedLangs')
    .populate('selectedAreas')
    .populate('selectedTechs')

    if (!user) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      data: { user },
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
}; // DONE

exports.updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const updatedData = req.body;
    
    const user = await User.findOneAndUpdate(
      { username },
      updatedData,
      { new: true }
    );
    
    if (!user) {
      throw new Error('Not Found');
    }
    
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully!',
      data: { user },
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
}; // DONE

exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
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
        message: `Error! User ${req.params.username} was not found or has already been deleted!`,
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
}; // DONE

// Profile & Settings
// These routes exclusively allow access to an authenticated user's private
// data and enable them to manage >only their own< profile and settings.

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Not Found');
    }

    const userProfile = {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      location: user.location,
      bio: user.bio,
      imgURL: user.imgURL,
    };

    res.status(200).json({
      status: 'success',
      data: { userProfile },
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
}; // DONE

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true, }
    );

    if (!updatedUser) {
      throw new Error('Not Found');
    }

    const userProfile = {
      username: updatedUser.username,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      location: updatedUser.location,
      bio: updatedUser.bio,
      imgURL: updatedUser.imgURL,
    };

    res.status(200).json({
      status: 'success',
      message: 'User profile updated successfully!',
      data: { userProfile },
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
}; // DONE


exports.getUserSelections = async (req, res) => { 
  try {
    const { username } = req.params;
    const user = await User.findOne(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      {
        _id: 0, __v: 0, password: 0,
        isAdmin: 0, createdAt: 0,
        lastLogin: 0, deactivated: 0,
      },
    )
    .populate('selectedLangs')
    .populate('selectedAreas')
    .populate('selectedTechs')
    .lean();
    
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
} // DONE

exports.updateUserSelections = async (req, res) => {
  try {
    const { username } = req.params;
    const { selectedLangs, selectedAreas, selectedTechs } = req.body;

    const user = await User.findOneAndUpdate(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      { selectedLangs, selectedAreas, selectedTechs },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'User selections updated successfully!',
      data: {
        selectedLangs: user.selectedLangs,
        selectedAreas: user.selectedAreas,
        selectedTechs: user.selectedTechs,
      },
    });
  } catch (err) {
    if (err.message === 'User not found') {
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
}; // >> TODO <<

exports.deactivateAcc = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw new Error('Invalid password');
    }

    user.deactivated = true;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Account deactivated successfully!',
    });
  } catch (err) {
    if (err.message === 'Invalid password') {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid password!',
      });
    } else if (err.message === 'User not found') {
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
}; // DONE