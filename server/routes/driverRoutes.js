const express = require('express');
const router = express.Router();
const { getAllDrivers, getDriverById, updateDriverStatus, deleteDriver } = require('../controllers/driverController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getAllDrivers);
router.get('/:id', protect, adminOnly, getDriverById);
router.put('/:id/status', protect, adminOnly, updateDriverStatus);
router.delete('/:id', protect, adminOnly, deleteDriver);

module.exports = router;
