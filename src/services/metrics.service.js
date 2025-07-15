const Inventory = require("../models/inventory.model");
const Stocks = require("../models/stock.model");
const Order = require("../models/order.model");
const Table = require("../models/table.model");

const getTodayDateRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const getInventoryMetrics = async () => {
  const { start, end } = getTodayDateRange();
  const totalInventory = await Inventory.countDocuments();
  const totalStocks = await Stocks.countDocuments();
  const todayRemainingInventory = await Inventory.aggregate([
    {
      $match: {
        updatedAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: null,
        inStock: { $sum: "$inStock" },
        cooked: { $sum: "$cooked" },
        newStock: { $sum: "$newStock" },
      },
    },
  ]);

  const todayInventory = todayRemainingInventory[0] || {
    inStock: 0,
    cooked: 0,
    newStock: 0,
  };

  const todayStocks = await Stocks.aggregate([
    {
      $match: {
        updatedAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: null,
        storeIn: { $sum: "$storeIn" },
        storeOut: { $sum: "$storeOut" },
        carried: { $sum: "$carried" },
        current: { $sum: "$current" },
      },
    },
  ]);

  const todayStock = todayStocks[0] || {
    storeIn: 0,
    storeOut: 0,
    carried: 0,
    current: 0,
  };

  const soldOrders = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
        status: "CONFIRMED",
      },
    },
    {
      $facet: {
        soldAmount: [
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$totalAmount" },
            },
          },
        ],
        soldItems: [
          { $unwind: "$items" },
          {
            $group: {
              _id: null,
              totalQuantity: { $sum: "$items.quantity" },
            },
          },
        ],
      },
    },
  ]);

  const soldAmount = soldOrders[0]?.soldAmount[0]?.totalAmount || 0;
  const soldItemCount = soldOrders[0]?.soldItems[0]?.totalQuantity || 0;

  return {
    totalInventory,
    totalStocks,
    todayInventory,
    todayStock,
    soldItemCount,
    soldAmount,
  };
};

const getDiningMetrics = async () => {
  const { start, end } = getTodayDateRange();
  const totalDinners = await Order.countDocuments({
    meal: "DINNER",
    createdAt: { $gte: start, $lte: end },
  });

  const totalSupers = await Order.countDocuments({
    meal: "SUPPER",
    createdAt: { $gte: start, $lte: end },
  });

  const totalLunches = await Order.countDocuments({
    meal: "LUNCH",
    createdAt: { $gte: start, $lte: end },
  });

  const totalBreakfasts = await Order.countDocuments({
    meal: "BREAKFAST",
    createdAt: { $gte: start, $lte: end },
  });

  const totalTables = await Table.countDocuments();
  const totalFreeTables = await Table.countDocuments({
    status: "FREE",
  });
  const totalReservedTables = await Table.countDocuments({
    status: "RESERVED",
  });

  return {
    totalBreakfasts,
    totalLunches,
    totalSupers,
    totalDinners,
    totalTables,
    totalFreeTables,
    totalReservedTables,
  };
};

module.exports = { getInventoryMetrics, getDiningMetrics };
