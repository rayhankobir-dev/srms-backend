const User = require("../models/user.model");

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  return user;
};

const createUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("Email already exists");
  const user = new User(data);
  return (await user.save()).select("-password");
};

const updateUser = async (id, data) => {
  const updated = await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password"
  );
  if (!updated) throw new Error("User not found for update");
  return updated;
};

const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id).populate("-password");
  if (!deleted) throw new Error("User not found for deletion");
  return deleted;
};

const bulkDeleteUsers = async (ids = []) => {
  return await User.deleteMany({ _id: { $in: ids } });
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
};
