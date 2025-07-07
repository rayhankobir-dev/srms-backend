const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");

const auth = async (req, res, next) => {
  let token = null;
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserService.getUserById(decoded.user._id);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid authentication token" });
  }
};

module.exports = auth;
