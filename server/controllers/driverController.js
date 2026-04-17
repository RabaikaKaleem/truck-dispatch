const User = require('../models/User');

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Admin
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' }).select('-password').sort({ createdAt: -1 });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Admin
const getDriverById = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id).select('-password');
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update driver status
// @route   PUT /api/drivers/:id/status
// @access  Admin
const updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ message: 'Driver not found' });
    }
    driver.status = status;
    await driver.save();
    res.json({ message: 'Driver status updated', driver });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Admin
const deleteDriver = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ message: 'Driver not found' });
    }
    await driver.deleteOne();
    res.json({ message: 'Driver removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllDrivers, getDriverById, updateDriverStatus, deleteDriver };
