const routes = require("express").Router();
const userRoutes = require("./user.routes.js");
const tableRoutes = require("./table.route.js");
const stockRoutes = require("./stock.route.js");
const orderRoutes = require("./order.route.js");
const settingsRoutes = require("./settings.routes.js");
const inventoryRoutes = require("./inventory.route.js");

routes.use("/users", userRoutes);
routes.use("/tables", tableRoutes);
routes.use("/stocks", stockRoutes);
routes.use("/orders", orderRoutes);
routes.use("/settings", settingsRoutes);
routes.use("/inventory", inventoryRoutes);

module.exports = routes;
