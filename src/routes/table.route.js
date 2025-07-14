const express = require("express");
const auth = require("../middlewares/auth.middleware");
const TableController = require("../controllers/table.controller");

const router = express.Router();

router.get("/", auth, TableController.getAllTables);
router.get("/:id", auth, TableController.getTableById);
router.get("/:id/orders", auth, TableController.getTableOrders);
router.post("/", auth, TableController.createTable);
router.put("/:id", auth, TableController.updateTable);
router.delete("/:id", auth, TableController.deleteTable);

module.exports = router;
