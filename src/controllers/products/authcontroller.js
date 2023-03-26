const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        error: 'User with email already exists',
      });
    }

    // create new user
    const newUser = await User.create({ name, email, password });

    // generate JWT token for user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong',
    });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid email or password',
      });
    }

    // check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid email or password',
      });
    }

    // generate JWT token for user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong',
    });
  }
};
