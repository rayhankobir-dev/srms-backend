const express = require("express");
const auth = require("../middlewares/auth.middleware");
const StockController = require("../controllers/stock.controller");

const router = express.Router();

router.get("/", auth, StockController.getAllStocks);
router.get("/:id", auth, StockController.getStockById);
router.post("/", auth, StockController.createStock);
router.put("/:id", auth, StockController.updateStock);
router.delete("/", auth, StockController.deleteStock);

module.exports = router;
