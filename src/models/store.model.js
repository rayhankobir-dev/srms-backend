const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    storeIn: {
      type: String,
      required: true,
      default: 0,
    },
    storeOut: {
      type: String,
      required: true,
      default: 0,
    },
    previous: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", restaurantSchema);
