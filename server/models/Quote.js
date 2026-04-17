const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    weight: { type: Number, required: true },
    cargoType: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    message: { type: String },
    estimatedCost: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
    adminNote: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
