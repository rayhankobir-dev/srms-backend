const routes = require("express").Router();
const userRoutes = require("./user.routes.js");
const storeRoutes = require("./store.routes.js");
const restaurantRoutes = require("./restaurant.routes.js");

routes.use("/users", userRoutes);
routes.use("/store-stocks", storeRoutes);
routes.use("/restaurant-stocks", restaurantRoutes);

module.exports = routes;
