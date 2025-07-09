const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    tableCount: { type: Number, default: 10 },
    taxPercentage: { type: Number, default: 10 },
    currency: {
      code: { type: String, default: "DBT" },
      name: { type: String, default: "Bangladeshi Taka" },
      sign: { type: String, default: "৳" },
    },
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
