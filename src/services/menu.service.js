const Menu = require("../models/menu.model");

const getAllMenus = async () => {
  return await Menu.find()
    .populate("linkedInventory", "itemName inStock unit")
    .populate("createdBy updatedBy", "firstName lastName email");
};

const getMenuById = async (id) => {
  const menu = await Menu.findById(id)
    .populate("linkedInventory", "itemName inStock unit")
    .populate("createdBy updatedBy", "firstName lastName email");
  if (!menu) throw new Error("Menu item not found");
  return menu;
};

const createMenu = async (data, userId) => {
  const menu = new Menu({
    ...data,
    createdBy: userId,
    updatedBy: userId,
  });
  return await menu.save();
};

const updateMenu = async (id, data, userId) => {
  const updated = await Menu.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
    { new: true }
  );
  if (!updated) throw new Error("Menu item not found for update");
  return updated;
};

const deleteMenu = async (id) => {
  const deleted = await Menu.findByIdAndDelete(id);
  if (!deleted) throw new Error("Menu item not found for deletion");
  return deleted;
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
