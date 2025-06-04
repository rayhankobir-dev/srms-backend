const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    newStock: {
      type: String,
      required: true,
      default: 0,
    },
    cooked: {
      type: String,
      required: true,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", storeSchema);
