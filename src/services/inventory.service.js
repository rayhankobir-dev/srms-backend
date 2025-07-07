const Inventory = require("../models/inventory.model");

const getAllInventory = async () => {
  return await Inventory.find().populate(
    "createdBy updatedBy",
    "firstName lastName email"
  );
};

const getInventoryById = async (id) => {
  const item = await Inventory.findById(id).populate(
    "createdBy updatedBy",
    "firstName lastName email"
  );
  if (!item) throw new Error("Inventory item not found");
  return item;
};

const createInventory = async (data, userId) => {
  const inventory = new Inventory({
    ...data,
    createdBy: userId,
    updatedBy: userId,
  });
  return await inventory.save();
};

const updateInventory = async (id, data, userId) => {
  const updated = await Inventory.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
    { new: true }
  );
  if (!updated) throw new Error("Inventory item not found for update");
  return updated;
};

const deleteInventory = async (id) => {
  const deleted = await Inventory.findByIdAndDelete(id);
  if (!deleted) throw new Error("Inventory item not found for deletion");
  return deleted;
};

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
};
