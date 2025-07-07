const Settings = require("../models/settings.model");

const getSettings = async () => {
  const settings = await Settings.findOne();
  return settings;
};

const createSettings = async (data) => {
  const existing = await Settings.findOne();
  if (existing) {
    throw new Error("Settings already exist");
  }
  const settings = new Settings(data);
  return await settings.save();
};

const updateSettings = async (data, userId) => {
  const updated = await Settings.findOneAndUpdate(
    {},
    { ...data, updatedBy: userId },
    { new: true, upsert: true }
  );
  return updated;
};

module.exports = {
  getSettings,
  createSettings,
  updateSettings,
};
