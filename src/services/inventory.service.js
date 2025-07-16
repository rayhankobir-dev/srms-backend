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
  await inventory.save();

  const result = await getInventoryById(inventory._id);
  return result;
};

const updateInventory = async (id, data, userId) => {
  const updated = await Inventory.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
    { new: true }
  ).populate("createdBy updatedBy", "firstName lastName email");
  if (!updated) throw new Error("Inventory item not found for update");
  return updated;
};

const deleteInventory = async (ids) => {
  const result = await Inventory.deleteMany({ _id: { $in: ids } });
  if (!result) throw new Error("Inventory item not found for deletion");
  return result;
};

module.exports = {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
};
