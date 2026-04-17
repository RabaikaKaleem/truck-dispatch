const express = require('express');
const router = express.Router();
const { createQuote, getAllQuotes, updateQuote, deleteQuote } = require('../controllers/quoteController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createQuote);                              // Public - anyone can request a quote
router.get('/', protect, adminOnly, getAllQuotes);
router.put('/:id', protect, adminOnly, updateQuote);
router.delete('/:id', protect, adminOnly, deleteQuote);

module.exports = router;
