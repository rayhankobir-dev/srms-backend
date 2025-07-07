const Table = require("../models/table.model");

const getAllTables = async () => {
  return await Table.find().populate(
    "assignedStaff createdBy updatedBy",
    "firstName lastName email"
  );
};

const getTableById = async (id) => {
  const table = await Table.findById(id)
    .populate("assignedStaff", "firstName lastName email")
    .populate("createdBy updatedBy", "firstName lastName email");
  if (!table) throw new Error("Table not found");
  return table;
};

const createTable = async (data, userId) => {
  const table = new Table({
    ...data,
    createdBy: userId,
    updatedBy: userId,
  });
  return (await table.save()).populate(
    "assignedStaff createdBy updatedBy",
    "firstName lastName email"
  );
};

const updateTable = async (id, data, userId) => {
  const updated = await Table.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
    { new: true }
  ).populate("assignedStaff createdBy updatedBy", "firstName lastName email");
  if (!updated) throw new Error("Table not found for update");
  return updated;
};

const deleteTable = async (id) => {
  const deleted = await Table.findByIdAndDelete(id);
  if (!deleted) throw new Error("Table not found for deletion");
  return deleted;
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
};
