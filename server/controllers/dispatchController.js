const Dispatch = require('../models/Dispatch');
const Load = require('../models/Load');

// @desc    Get all dispatches
// @route   GET /api/dispatch
// @access  Admin
const getAllDispatches = async (req, res) => {
  try {
    const dispatches = await Dispatch.find()
      .populate('load', 'title pickupLocation dropLocation cargoType weight')
      .populate('driver', 'name email phone truckPlate')
      .sort({ createdAt: -1 });
    res.json(dispatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dispatches for logged-in driver
// @route   GET /api/dispatch/my
// @access  Driver
const getMyDispatches = async (req, res) => {
  try {
    const dispatches = await Dispatch.find({ driver: req.user._id })
      .populate('load', 'title pickupLocation dropLocation cargoType weight status')
      .sort({ createdAt: -1 });
    res.json(dispatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update dispatch status
// @route   PUT /api/dispatch/:id/status
// @access  Admin or Driver
const updateDispatchStatus = async (req, res) => {
  try {
    const { status, currentLocation } = req.body;
    const dispatch = await Dispatch.findById(req.params.id);
    if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });

    dispatch.status = status;
    if (currentLocation) dispatch.currentLocation = currentLocation;
    await dispatch.save();

    // Sync load status
    const load = await Load.findById(dispatch.load);
    if (load) {
      if (status === 'delivered') load.status = 'delivered';
      else if (status === 'in-transit') load.status = 'in-transit';
      await load.save();
    }

    res.json({ message: 'Dispatch status updated', dispatch });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllDispatches, getMyDispatches, updateDispatchStatus };
