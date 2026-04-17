const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe, createAdmin, getAllAdmins, deleteAdmin } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

// Admin management routes
router.post('/create-admin', protect, adminOnly, createAdmin);
router.get('/admins', protect, adminOnly, getAllAdmins);
router.delete('/admins/:id', protect, adminOnly, deleteAdmin);

module.exports = router;
