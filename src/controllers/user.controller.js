const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/lib.js");
const UserService = require("../services/user.service");
const resetPasswordEmail = require("../utils/templates/reset-password.template.js");

const getUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(
      req.body?.password || "Password@123",
      10
    );
    data.password = hashedPassword;
    const user = await UserService.createUser(data);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User deleted successfully", user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const bulkDeleteUsers = async (req, res) => {
  try {
    if (!Array.isArray(req.body.ids)) {
      return res.status(400).json({ message: "ids must be an array" });
    }

    const result = await UserService.bulkDeleteUsers(ids);
    return res.json({
      message: `Selected ${result.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({ message: "Incorrect password or email" });

    user.password = undefined;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production",
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    path: "/",
  });
  return res.json({ message: "Logged out successfully" });
};

const forgetPassword = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
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

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await UserService.getUserByEmail(req.user.email);
    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  forgetPassword,
  resetPassword,
  changePassword,
};
