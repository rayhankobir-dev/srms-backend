const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/index.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

module.exports = app;
