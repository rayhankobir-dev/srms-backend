const { Router } = require("express");
const {
  getRestaurantStocks,
  addRestaurantStock,
  updateRestaurantStock,
  deleteRestaurantStocks,
  getMetrics,
} = require("../controllers/restaurant.controller");

const router = Router();

router.get("/", getRestaurantStocks);
router.post("/", addRestaurantStock);
router.put("/:id", updateRestaurantStock);
router.delete("/", deleteRestaurantStocks);
router.get("/metrics", getMetrics);

module.exports = router;
