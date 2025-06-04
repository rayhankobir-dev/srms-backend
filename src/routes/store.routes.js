const { Router } = require("express");
const {
  getStoreStocks,
  addStoreStock,
  updateStoreStock,
  deleteStoreStocks,
} = require("../controllers/store.controller");

const router = Router();

router.get("/", getStoreStocks);
router.post("/", addStoreStock);
router.put("/:id", updateStoreStock);
router.delete("/", deleteStoreStocks);

module.exports = router;
