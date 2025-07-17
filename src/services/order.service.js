const Order = require("../models/order.model");

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("table", "name status")
    .populate("items.menu", "itemName thumbnail meal");
  return orders;
};

const getOrdersByTable = async (filter = {}, options = {}) => {
  const { sort, limit, skip, select, populate } = options;
  delete filter.page;
  delete filter.limit;
  let query = Order.find(filter);

  query = query.sort({
    ...sort,
    createdAt: -1,
  });
  if (limit) query = query.limit(limit);
  if (skip) query = query.skip(skip);
  if (select) query = query.select(select);
  if (populate) query = query.populate(populate);

  return await query;
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
  const order = await Order.create({
    ...data,
    createdBy: userId,
  });

  const populatedOrder = await Order.findById(order._id)
    .populate("table", "name status assignedStaff")
    .populate("items.menu", "itemName meal thumbnail");

  return populatedOrder;
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

const deleteOrders = async (ids) => {
  const result = await Order.deleteMany({ _id: { $in: ids } });
  if (!result) throw new Error("Order not found for deletion");
  return result;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByTable,
  deleteOrders,
};
