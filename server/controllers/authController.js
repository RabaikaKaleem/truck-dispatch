const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register a new driver
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, phone, licenseNo, truckType, truckPlate } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      licenseNo,
      truckType,
      truckPlate,
      role: 'driver',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user (admin or driver)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Your account has been suspended. Contact admin.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      licenseNo: user.licenseNo,
      truckType: user.truckType,
      truckPlate: user.truckPlate,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current logged-in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
const updateMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, phone, licenseNo, truckType, truckPlate } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (licenseNo) user.licenseNo = licenseNo;
    if (truckType) user.truckType = truckType;
    if (truckPlate) user.truckPlate = truckPlate;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new admin (only existing admins can do this)
// @route   POST /api/auth/create-admin
// @access  Admin only
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const admin = await User.create({
      name,
      email,
      password,
      phone,
      role: 'admin',
      status: 'active',
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      message: 'Admin account created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all admins
// @route   GET /api/auth/admins
// @access  Admin only
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an admin
// @route   DELETE /api/auth/admins/:id
// @access  Admin only
const deleteAdmin = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }
    const admin = await User.findById(req.params.id);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin not found' });
    }
    await admin.deleteOne();
    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe, updateMe, createAdmin, getAllAdmins, deleteAdmin };
