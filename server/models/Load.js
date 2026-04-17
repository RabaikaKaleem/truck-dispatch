const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    deliveryDate: { type: Date },
    weight: { type: Number, required: true },
    cargoType: { type: String, required: true },
    specialInstructions: { type: String },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'in-transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    estimatedCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Load', loadSchema);
