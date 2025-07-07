const mongoose = require("mongoose");

const stocksSchema = new mongoose.Schema(
  {
    itemName: { type: String },
    storeIn: { type: Number },
    storeOut: { type: Number },
    carried: { type: Number },
    current: { type: Number },
    unit: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stocks", stocksSchema);
