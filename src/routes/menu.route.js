const express = require("express");
const auth = require("../middlewares/auth.middleware");
const MenuController = require("../controllers/menu.controller");

const router = express.Router();

router.get("/", auth, MenuController.getAllMenus);
router.get("/:id", auth, MenuController.getMenuById);
router.post("/", auth, MenuController.createMenu);
router.put("/:id", auth, MenuController.updateMenu);
router.delete("/", auth, MenuController.bulkDelete);

module.exports = router;
