const express = require("express");
const auth = require("../middlewares/auth.middleware");
const OrderController = require("../controllers/order.controller");

const router = express.Router();

router.get("/", auth, OrderController.getAllOrders);
router.get("/:id", auth, OrderController.getOrderById);
router.post("/", auth, OrderController.createOrder);
router.put("/:id", auth, OrderController.updateOrder);
router.delete("/:id", auth, OrderController.deleteOrder);

module.exports = router;
