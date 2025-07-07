const Order = require("../models/order.model");

const getAllOrders = async () => {
  return await Order.find()
    .populate("tableId", "status")
    .populate("createdBy", "firstName lastName email")
    .populate("items.menuId", "itemName meal");
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("tableId", "status")
    .populate("createdBy", "firstName lastName email")
    .populate("items.menuId", "itemName meal");
  if (!order) throw new Error("Order not found");
  return order;
};

const createOrder = async (data, userId) => {
  const order = new Order({
    ...data,
    createdBy: userId,
  });
  return await order.save();
};

const updateOrder = async (id, data) => {
  const updated = await Order.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Order not found for update");
  return updated;
};

const deleteOrder = async (id) => {
  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) throw new Error("Order not found for deletion");
  return deleted;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
