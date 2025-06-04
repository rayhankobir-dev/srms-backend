const Restaurant = require("../models/restaurant.model.js");
const Store = require("../models/store.model.js");

const getRestaurantStocks = async (req, res) => {
  try {
    const stores = await Restaurant.find();
    return res.json(stores);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const addRestaurantStock = async (req, res) => {
  try {
    const { itemName } = req.body;
    const isExists = await Restaurant.findOne({ itemName });
    if (isExists)
      return res.status(400).json({ message: "Item already exists" });

    const store = await Restaurant.create(req.body);
    return res.json(store);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateRestaurantStock = async (req, res) => {
  try {
    const stock = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!stock) return res.status(404).json({ message: "Item not found" });
    return res.json(stock);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteRestaurantStocks = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "ids must be an array" });
    }

    const result = await Restaurant.deleteMany({ _id: { $in: ids } });
    return res.json({
      message: `Selected ${result.deletedCount} stocks deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMetrics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    threeMonthsAgo.setHours(0, 0, 0, 0);

    const todayRestaurantDocs = await Restaurant.find({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const todayStoreDocs = await Store.find({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const cookedItems = todayRestaurantDocs.length;
    const totalSales = todayRestaurantDocs.reduce(
      (sum, doc) => sum + Number(doc.sales || 0),
      0
    );
    const totalInStocks = todayRestaurantDocs.reduce(
      (sum, doc) => sum + Number(doc.newStock || 0),
      0
    );
    const currentStocks = todayStoreDocs.reduce(
      (sum, doc) => sum + Number(doc.current || 0),
      0
    );
    const previousStocks = todayStoreDocs.reduce(
      (sum, doc) => sum + Number(doc.previous || 0),
      0
    );

    const stastics = await Restaurant.aggregate([
      {
        $match: {
          createdAt: { $gte: threeMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalStocks: { $sum: { $toInt: "$newStock" } },
          sales: { $sum: "$sales" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalStocks: 1,
          sales: 1,
        },
      },
    ]);

    res.json({
      metrics: [
        {
          title: "Cooked Items",
          value: cookedItems,
          color: "bg-blue-500",
          unit: "Items",
        },
        {
          title: "Total In Stocks",
          value: totalInStocks,
          color: "bg-green-500",
        },
        {
          title: "Total Sales",
          value: totalSales,
          color: "bg-red-500",
          unit: "৳",
        },
        {
          title: "Current Stocks",
          value: currentStocks,
          color: "bg-yellow-500",
        },
        {
          title: "Previous Stocks",
          value: previousStocks,
          color: "bg-purple-500",
        },
      ],
      stastics,
    });
  } catch (error) {
    console.error("Error in /inventory-analytics:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getRestaurantStocks,
  addRestaurantStock,
  updateRestaurantStock,
  deleteRestaurantStocks,
  getMetrics,
};
