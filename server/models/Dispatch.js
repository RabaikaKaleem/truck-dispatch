const mongoose = require('mongoose');

const dispatchSchema = new mongoose.Schema(
  {
    load: { type: mongoose.Schema.Types.ObjectId, ref: 'Load', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dispatchedAt: { type: Date, default: Date.now },
    estimatedArrival: { type: Date },
    notes: { type: String },
    status: {
      type: String,
      enum: ['dispatched', 'in-transit', 'delivered', 'cancelled'],
      default: 'dispatched',
    },
    currentLocation: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dispatch', dispatchSchema);
