const express = require("express");
const auth = require("../middlewares/auth.middleware");
const MetricsController = require("../controllers/metrics.controller");

const router = express.Router();

router.get("/inventory", auth, MetricsController.inventoryMetrics);
router.get("/dining", auth, MetricsController.diningMetrics);

module.exports = router;
