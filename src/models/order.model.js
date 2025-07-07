const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    meal: {
      type: String,
      enum: ["BREAKFAST", "LUNCH", "SUPPER", "DINNER"],
      required: true,
    },
    status: {
      type: String,
      enum: ["RESERVED", "CONFIRMED", "CANCELLED"],
      default: "RESERVED",
    },
    totalAmount: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    taxApplied: { type: Boolean, default: false },
    taxAmount: { type: Number, default: 0 },
    paymentMethod: {
      type: String,
      enum: ["CARD", "CASH", "ONLINE"],
      default: "CASH",
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "UNPAID",
    },
    items: [
      {
        menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        inventoryImpact: { type: Number, required: true },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
