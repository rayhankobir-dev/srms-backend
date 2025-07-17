const Menu = require("../models/menu.model");

const getAllMenus = async (filter = {}) => {
  const { meal, available } = filter;
  if (available) {
    return await getAvailableMenus(meal);
  }

  return await Menu.find(filter)
    .populate("linkedInventory", "itemName inStock unit")
    .populate("createdBy updatedBy", "firstName lastName email");
};

const getAvailableMenus = async (meal) => {
  try {
    const menus = await Menu.find({
      meal,
      linkedInventory: { $ne: null },
    }).populate("linkedInventory");

    const filteredMenus = menus.filter((menu) => menu?.linkedInventory?.cooked);

    return filteredMenus;
  } catch (error) {
    console.error("Failed to fetch available menus:", error);
    return [];
  }
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

const bulkDeleteMenu = async (ids) => {
  const deleted = await Menu.deleteMany({ _id: { $in: ids } });
  return deleted;
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  bulkDeleteMenu,
};
