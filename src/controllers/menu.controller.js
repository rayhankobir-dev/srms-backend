const MenuService = require("../services/menu.service");

const getAllMenus = async (req, res) => {
  try {
    const menus = await MenuService.getAllMenus();
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

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
