const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    tableCount: { type: Number, default: 10 },
    taxPercentage: { type: Number, default: 10 },
    currency: { type: String, default: "BDT" },
    inventoryInsufficencyAt: { type: Number, default: 10 },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
