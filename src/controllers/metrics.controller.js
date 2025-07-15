const MetricsService = require("../services/metrics.service");

const inventoryMetrics = async (req, res) => {
  try {
    const metrics = await MetricsService.getInventoryMetrics();
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const diningMetrics = async (req, res) => {
  try {
    const metrics = await MetricsService.getDiningMetrics();
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { inventoryMetrics, diningMetrics };
