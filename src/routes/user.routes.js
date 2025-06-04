const { Router } = require("express");
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  loginUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middlware");

const router = Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/bulk-delete", bulkDeleteUsers);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
