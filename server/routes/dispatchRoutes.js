const express = require('express');
const router = express.Router();
const { getAllDispatches, getMyDispatches, updateDispatchStatus } = require('../controllers/dispatchController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getAllDispatches);
router.get('/my', protect, getMyDispatches);
router.put('/:id/status', protect, updateDispatchStatus);

module.exports = router;
