const User = require('../models/User');
const Load = require('../models/Load');
const Quote = require('../models/Quote');
const Dispatch = require('../models/Dispatch');

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/stats
// @access  Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalDrivers = await User.countDocuments({ role: 'driver' });
    const activeDrivers = await User.countDocuments({ role: 'driver', status: 'active' });
    const totalLoads = await Load.countDocuments();
    const pendingLoads = await Load.countDocuments({ status: 'pending' });
    const assignedLoads = await Load.countDocuments({ status: 'assigned' });
    const inTransitLoads = await Load.countDocuments({ status: 'in-transit' });
    const deliveredLoads = await Load.countDocuments({ status: 'delivered' });
    const totalQuotes = await Quote.countDocuments();
    const pendingQuotes = await Quote.countDocuments({ status: 'pending' });
    const totalDispatches = await Dispatch.countDocuments();

    // Recent loads
    const recentLoads = await Load.find()
      .populate('assignedDriver', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent quotes
    const recentQuotes = await Quote.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      drivers: { total: totalDrivers, active: activeDrivers },
      loads: { total: totalLoads, pending: pendingLoads, assigned: assignedLoads, inTransit: inTransitLoads, delivered: deliveredLoads },
      quotes: { total: totalQuotes, pending: pendingQuotes },
      dispatches: { total: totalDispatches },
      recentLoads,
      recentQuotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
