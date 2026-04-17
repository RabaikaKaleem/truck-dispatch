const Quote = require('../models/Quote');

// Simple cost calculation: base rate per km * weight factor
const calculateCost = (weight, pickupLocation, dropLocation) => {
  const baseRate = 2.5; // $ per km
  const weightFactor = weight > 5000 ? 1.5 : weight > 2000 ? 1.2 : 1;
  const estimatedKm = Math.floor(Math.random() * 800) + 100; // Simulated distance
  return Math.round(baseRate * estimatedKm * weightFactor);
};

// @desc    Submit a quote request
// @route   POST /api/quotes
// @access  Public
const createQuote = async (req, res) => {
  try {
    const { name, email, phone, pickupLocation, dropLocation, weight, cargoType, pickupDate, message } = req.body;

    if (!name || !email || !phone || !pickupLocation || !dropLocation || !weight || !cargoType || !pickupDate) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const estimatedCost = calculateCost(weight, pickupLocation, dropLocation);

    const quote = await Quote.create({
      name,
      email,
      phone,
      pickupLocation,
      dropLocation,
      weight,
      cargoType,
      pickupDate,
      message,
      estimatedCost,
    });

    res.status(201).json({
      message: 'Quote submitted successfully! Our team will contact you shortly.',
      quote,
      estimatedCost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Admin
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update quote status and admin note
// @route   PUT /api/quotes/:id
// @access  Admin
const updateQuote = async (req, res) => {
  try {
    const { status, adminNote, estimatedCost } = req.body;
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    if (status) quote.status = status;
    if (adminNote) quote.adminNote = adminNote;
    if (estimatedCost) quote.estimatedCost = estimatedCost;

    await quote.save();
    res.json({ message: 'Quote updated', quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a quote
// @route   DELETE /api/quotes/:id
// @access  Admin
const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    await quote.deleteOne();
    res.json({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuote, getAllQuotes, updateQuote, deleteQuote };
