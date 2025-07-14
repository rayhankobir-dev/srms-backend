const TableService = require("../services/table.service");
const OrderService = require("../services/order.service");

const getAllTables = async (req, res) => {
  try {
    const tables = await TableService.getAllTables();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTableById = async (req, res) => {
  try {
    const table = await TableService.getTableById(req.params.id);
    res.status(200).json(table);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createTable = async (req, res) => {
  try {
    const table = await TableService.createTable(req.body, req.user._id);
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTable = async (req, res) => {
  try {
    const updated = await TableService.updateTable(
      req.params.id,
      req.body,
      req.user._id
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const table = await TableService.deleteTable(req.params.id);
    res.status(204).json({ table });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getTableOrders = async (req, res) => {
  try {
    const orders = await OrderService.getOrdersByTable({
      table: req.params.id,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getTableOrders,
};
