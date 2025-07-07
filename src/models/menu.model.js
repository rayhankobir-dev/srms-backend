const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    meal: { type: String, enum: ["BREAKFAST", "LUNCH", "SUPPER", "DINNER"] },
    itemName: { type: String, required: true },
    thumbnail: { type: String, required: false },
    pricing: [
      {
        unit: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        inventoryImpact: { type: Number, required: true },
      },
    ],
    date: { type: Date, default: Date.now },
    linkedInventory: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
