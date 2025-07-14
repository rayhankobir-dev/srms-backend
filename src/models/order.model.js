const mongoose = require("mongoose");
const Menu = require("./menu.model");
const Table = require("./table.model");
const Inventory = require("./inventory.model");

const orderSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    meal: {
      type: String,
      enum: ["BREAKFAST", "LUNCH", "SUPPER", "DINNER"],
      required: true,
      default: "BREAKFAST",
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "SERVED", "CANCELLED"],
      default: "CONFIRMED",
    },
    totalAmount: { type: Number, required: true },
    dipositAmount: { type: Number, required: true, default: 0 },
    discountPercentage: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    taxApplied: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["N/A", "CARD", "CASH", "ONLINE"],
      default: "N/A",
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "UNPAID", "PARTIAL"],
      default: "UNPAID",
    },
    items: [
      {
        menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        inventoryImpact: { type: Number, required: true },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

orderSchema.post("save", async function (doc, next) {
  try {
    for (const item of doc.items) {
      const menu = await Menu.findById(item.menu).lean();
      if (!menu || !menu.linkedInventory) continue;

      const totalImpact = item.quantity * item.inventoryImpact;

      await Inventory.findByIdAndUpdate(menu.linkedInventory, {
        $inc: { inStock: -totalImpact, sold: totalImpact },
      });
    }

    next();
  } catch (err) {
    console.error("Inventory update error:", err);
    next(err);
  }
});

orderSchema.post("findOneAndUpdate", async function (doc, next) {
  try {
    if (!doc) return next();
    const updatedStatus = doc.status;

    if (updatedStatus === "SERVED") {
      await Table.findByIdAndUpdate(doc.table, {
        $set: { status: "FREE" },
      });
    }

    next();
  } catch (err) {
    console.error("Table status update error:", err);
    next(err);
  }
});

module.exports = mongoose.model("Order", orderSchema);
