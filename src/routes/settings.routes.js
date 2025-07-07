const express = require("express");
const auth = require("../middlewares/auth.middleware");
const SettingsController = require("../controllers/settings.controller");

const router = express.Router();

router.get("/", auth, SettingsController.getSettings);
router.post("/", auth, SettingsController.createSettings);
router.put("/", auth, SettingsController.updateSettings);

module.exports = router;
