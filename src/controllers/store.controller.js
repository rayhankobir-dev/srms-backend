const Store = require("../models/store.model.js");

const getStoreStocks = async (req, res) => {
  try {
    const stores = await Store.find();
    return res.json(stores);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const addStoreStock = async (req, res) => {
  try {
    const { itemName } = req.body;
    const isExists = await Store.findOne({ itemName });
    if (isExists)
      return res.status(400).json({ message: "Item already exists" });

    const store = await Store.create(req.body);
    return res.json(store);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateStoreStock = async (req, res) => {
  try {
    const stock = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!stock) return res.status(404).json({ message: "Item not found" });
    return res.json(stock);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteStoreStocks = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "ids must be an array" });
    }

    const result = await Store.deleteMany({ _id: { $in: ids } });
    return res.json({
      message: `Selected ${result.deletedCount} stocks deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getStoreStocks,
  addStoreStock,
  updateStoreStock,
  deleteStoreStocks,
};
