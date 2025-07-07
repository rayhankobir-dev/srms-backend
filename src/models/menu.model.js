const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  meal: { type: String, enum: ['BREAKFAST', 'LUNCH', 'SUPPER', 'DINNER'] },
  itemName: String,
  thumbnail: String,
  pricing: [
    {
        unit: { type: String },
        unitPrice: { type: Number },
        quantity: { type: Number },
    }
  ],
  date: { type: Date, default: Date.now },
  linkedInventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
