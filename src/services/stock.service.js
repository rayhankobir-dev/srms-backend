const Stocks = require("../models/stock.model");

const getAllStocks = async () => {
  return await Stocks.find().populate(
    "createdBy updatedBy",
    "firstName lastName email"
  );
};

const getStockById = async (id) => {
  const stock = await Stocks.findById(id).populate(
    "createdBy updatedBy",
    "firstName lastName email"
  );
  if (!stock) throw new Error("Stock not found");
  return stock;
};

const createStock = async (data, userId) => {
  const stock = new Stocks({
    ...data,
    createdBy: userId,
    updatedBy: userId,
  });
  return await stock.save();
};

const updateStock = async (id, data, userId) => {
  const updated = await Stocks.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
    { new: true }
  );
  if (!updated) throw new Error("Stock not found for update");
  return updated;
};

const deleteStocks = async (ids) => {
  const result = await Stocks.deleteMany({ _id: { $in: ids } });
  if (!result) throw new Error("Stock not found for deletion");
  return result;
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStocks,
};
