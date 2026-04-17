const express = require('express');
const router = express.Router();
const { getLoads, getLoadById, createLoad, assignDriver, updateLoadStatus, deleteLoad } = require('../controllers/loadController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, getLoads);
router.get('/:id', protect, getLoadById);
router.post('/', protect, createLoad);
router.put('/:id/assign', protect, adminOnly, assignDriver);
router.put('/:id/status', protect, updateLoadStatus);
router.delete('/:id', protect, adminOnly, deleteLoad);

module.exports = router;
