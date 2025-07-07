const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  newStock: { type: Number, default: 0 },
  inStock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  unit: { type: String, required: true },
  servesPerUnit: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
