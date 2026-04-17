const Load = require('../models/Load');
const Dispatch = require('../models/Dispatch');

// @desc    Get all loads (admin) or driver's loads
// @route   GET /api/loads
// @access  Private
const getLoads = async (req, res) => {
  try {
    let loads;
    if (req.user.role === 'admin') {
      loads = await Load.find()
        .populate('assignedDriver', 'name email phone truckPlate')
        .populate('requestedBy', 'name email')
        .sort({ createdAt: -1 });
    } else {
      loads = await Load.find({ assignedDriver: req.user._id })
        .populate('assignedDriver', 'name email phone')
        .sort({ createdAt: -1 });
    }
    res.json(loads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single load
// @route   GET /api/loads/:id
// @access  Private
const getLoadById = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id)
      .populate('assignedDriver', 'name email phone truckPlate')
      .populate('requestedBy', 'name email');
    if (!load) return res.status(404).json({ message: 'Load not found' });
    res.json(load);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new load request
// @route   POST /api/loads
// @access  Private
const createLoad = async (req, res) => {
  try {
    const { title, pickupLocation, dropLocation, pickupDate, weight, cargoType, specialInstructions } = req.body;

    if (!title || !pickupLocation || !dropLocation || !pickupDate || !weight || !cargoType) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const load = await Load.create({
      title,
      pickupLocation,
      dropLocation,
      pickupDate,
      weight,
      cargoType,
      specialInstructions,
      requestedBy: req.user._id,
    });

    res.status(201).json(load);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign driver to load
// @route   PUT /api/loads/:id/assign
// @access  Admin
const assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;
    const load = await Load.findById(req.params.id);
    if (!load) return res.status(404).json({ message: 'Load not found' });

    load.assignedDriver = driverId;
    load.status = 'assigned';
    await load.save();

    // Create dispatch record
    await Dispatch.create({
      load: load._id,
      driver: driverId,
      notes: req.body.notes || '',
      estimatedArrival: req.body.estimatedArrival,
    });

    res.json({ message: 'Driver assigned successfully', load });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update load status
// @route   PUT /api/loads/:id/status
// @access  Private
const updateLoadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const load = await Load.findById(req.params.id);
    if (!load) return res.status(404).json({ message: 'Load not found' });

    load.status = status;
    await load.save();

    // Sync dispatch status
    const dispatch = await Dispatch.findOne({ load: load._id });
    if (dispatch) {
      dispatch.status = status === 'delivered' ? 'delivered' : status === 'in-transit' ? 'in-transit' : dispatch.status;
      await dispatch.save();
    }

    res.json({ message: 'Status updated', load });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete load
// @route   DELETE /api/loads/:id
// @access  Admin
const deleteLoad = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);
    if (!load) return res.status(404).json({ message: 'Load not found' });
    await load.deleteOne();
    res.json({ message: 'Load deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLoads, getLoadById, createLoad, assignDriver, updateLoadStatus, deleteLoad };
