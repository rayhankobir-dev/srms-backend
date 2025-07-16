const OrderService = require("../services/order.service");
const TableService = require("../services/table.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { table } = req.body;
    const order = await OrderService.createOrder(req.body, req.user._id);
    await TableService.updateTable(table, { status: "RESERVED" }, req.user._id);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updated = await OrderService.updateOrder(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await OrderService.deleteOrder(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const bulkDeleteOrders = async (req, res) => {
  try {
    const ids = req.body?.ids;
    if (!ids) {
      return res.status(400).json({ message: "Order ids is required" });
    }
    const result = await OrderService.deleteOrders(ids);
    res.status(200).json({
      message: `Selected (${result.deletedCount}) order items deleted!`,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  bulkDeleteOrders,
};
