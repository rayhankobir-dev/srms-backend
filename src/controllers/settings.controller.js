const SettingsService = require("../services/settings.service");

const getSettings = async (req, res) => {
  try {
    const settings = await SettingsService.getSettings();
    res.status(200).json(settings);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const createSettings = async (req, res) => {
  try {
    const data = req.body;
    data.updatedBy = req.user._id;
    const settings = await SettingsService.createSettings(data);
    res.status(201).json({ message: "Seetings has been created", settings });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = await SettingsService.updateSettings(
      req.body,
      req.user._id
    );
    res.status(200).json({ message: "Settings has been updated", settings });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getSettings,
  createSettings,
  updateSettings,
};
