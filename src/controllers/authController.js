const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

const createSendToken = (user, statusCode, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000,
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  const token = signToken(user._id)
  res.cookie('jwt', token, cookieOptions);

  // Remove passowrd from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Register new user: destructures req data, hashes password.
// Saves user to DB, catches error if needed.

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

// Login: destructures req data, checks user by username or email.
// Checks password, signs user, returns token. Throw errors if needed.
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await User.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect user or password", 401));
  }

  // 3) If all is ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's ok
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorizatio.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to access', 401),
    );
  }

  // 2) Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // 3)
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('This token belongs to no user!', 401));
  }

  // Check it user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};


/*
exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user) {
      throw new AppError('Invalid credentials!', 401);
    }

    if (user.deactivated === true) {
      throw new AppError('This account is deactivated!', 401);
    }

    const validPass = await bcrypt.compare(password, user.password);
    
    if (!validPass) {
      throw new AppError('Invalid credentials!', 401);
    }

    const token = jwt.sign(
      {
        userId: user._id, expiresIn: process.env.EXPIRES_IN
      },
      process.env.JWT_SECRET
    );

    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Logged in successfully!',
      token,
    });

  } catch (err) {
    return next(err)
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { currentPass, newPassword, newPassConfirm } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found!', 404);
    }
    if (newPassword !== newPassConfirm) {
      throw new AppError('Passwords do not match', 400);
    }

    const validCurrentPass = await bcrypt.compare(
      currentPass,
      user.password
    );

    if (!validCurrentPass) {
      throw new AppError('Invalid credentials!', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully!',
    });
  } catch (err) {
    return next(err);
  }
};
*/