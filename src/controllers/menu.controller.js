const MenuService = require("../services/menu.service");

const getAllMenus = async (req, res) => {
  try {
    const menus = await MenuService.getAllMenus({...req.query});
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await MenuService.getMenuById(req.params.id);
    res.status(200).json(menu);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createMenu = async (req, res) => {
  try {
    const menu = await MenuService.createMenu(req.body, req.user._id);
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const updated = await MenuService.updateMenu(
      req.params.id,
      req.body,
      req.user._id
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    await MenuService.deleteMenu(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const bulkDelete = async (req, res) => {
  try {
    const ids = req.body?.ids;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Menu IDs must be a non-empty array" });
    }

    const result = await MenuService.bulkDeleteMenu(ids);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No menu items found for deletion" });
    }

    return res.status(200).json({
      message: `Selected (${result.deletedCount}) menu items deleted!`,
    });
  } catch (err) {
    console.error("Bulk Delete Error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  bulkDelete
};
