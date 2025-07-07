const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes/index.js");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.APP_URL, credentials: true }));

app.use("/api", routes);

module.exports = app;
