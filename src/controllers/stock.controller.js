const StockService = require("../services/stock.service");

const getAllStocks = async (req, res) => {
  try {
    const stocks = await StockService.getAllStocks();
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStockById = async (req, res) => {
  try {
    const stock = await StockService.getStockById(req.params.id);
    res.status(200).json(stock);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createStock = async (req, res) => {
  try {
    const stock = await StockService.createStock(req.body, req.user._id);
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const updated = await StockService.updateStock(
      req.params.id,
      req.body,
      req.user._id
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteStock = async (req, res) => {
  try {
    const ids = req.body?.ids;
    if (!ids) {
      return res.status(400).json({ message: "Stock ids is required" });
    }
    const result = await StockService.deleteStocks(ids);
    res.status(204).json({
      message: `Selected (${result.deletedCount}) stock items deleted!`,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
