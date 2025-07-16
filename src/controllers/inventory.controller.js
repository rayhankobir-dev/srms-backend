const InventoryService = require("../services/inventory.service");
const Stock = require("../models/stock.model");

const getAllInventory = async (req, res) => {
  try {
    const items = await InventoryService.getAllInventory();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const item = await InventoryService.getInventoryById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createInventory = async (req, res) => {
  try {
    const { itemName, newStock } = req.body;
    const stock = await Stock.findOne({ itemName });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    if (newStock > stock.current) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const item = await InventoryService.createInventory(req.body, req.user._id);

    stock.current = stock.current - newStock;
    stock.storeOut = stock.storeOut + newStock;
    await stock.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { newStock, itemName } = req.body;
    const inventory = await InventoryService.getInventoryById(req.params.id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });

    const stock = await Stock.findOne({ itemName });
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const oldNewStock = inventory.newStock;
    const stockDiff = newStock - oldNewStock;

    if (stockDiff > 0 && stock.current < stockDiff) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const item = await InventoryService.updateInventory(
      req.params.id,
      req.body,
      req.user._id
    );

    stock.current -= stockDiff;
    stock.storeOut += stockDiff;
    await stock.save();

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const ids = req.body?.ids;
    if (!ids) {
      return res.status(400).json({ message: "Inventory ids is required" });
    }
    const result = await InventoryService.deleteInventory(ids);
    res.status(200).json({
      message: `Selected (${result.deletedCount}) inventory items deleted!`,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
};
