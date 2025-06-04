const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { sendEmail } = require("../utils/lib.js");
const resetPasswordEmail = require("../utils/templates/reset-password.template.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserByIdOrEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.params.id }, { _id: req.params.id }],
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body?.password || "Password@123",
      10
    );
    const user = await User.create({ ...req.body, password: hashedPassword });
    user.password = undefined;
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const bulkDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "ids must be an array" });
    }

    const result = await User.deleteMany({ _id: { $in: ids } });
    return res.json({
      message: `Selected ${result.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({ message: "Incorrect password or email" });

    user.password = undefined;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    const resetPasswordLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

    await sendEmail(
      user.email,
      "Reset Password",
      resetPasswordEmail({ firstName: user.firstName, resetPasswordLink })
    );

    return res.status(200).json({
      resetPasswordLink,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Missing token or password" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.user });

    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getUsers,
  getUserByIdOrEmail,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  forgetPassword,
  resetPassword,
};
