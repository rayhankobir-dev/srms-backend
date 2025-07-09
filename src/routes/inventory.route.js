const express = require("express");
const auth = require("../middlewares/auth.middleware");
const InventoryController = require("../controllers/inventory.controller");

const router = express.Router();

router.get("/", auth, InventoryController.getAllInventory);
router.get("/:id", auth, InventoryController.getInventoryById);
router.post("/", auth, InventoryController.createInventory);
router.put("/:id", auth, InventoryController.updateInventory);
router.delete("/", auth, InventoryController.deleteInventory);

module.exports = router;
