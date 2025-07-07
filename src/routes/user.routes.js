const { Router } = require("express");
const auth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middlware");
const UserController = require("../controllers/user.controller");

const router = Router();

router.get("/", auth, authorize(["ADMIN", "MANAGER"]), UserController.getUsers);
router.post("/", auth, authorize(["ADMIN"]), UserController.registerUser);
router.put("/:id", auth, UserController.updateUser);
router.get("/profile", auth, UserController.getProfile);
router.post("/login", UserController.loginUser);
router.delete("/logout", auth, UserController.logoutUser);
router.delete("/:id", auth, authorize(["ADMIN"]), UserController.deleteUser);
router.delete(
  "/bulk-delete",
  authorize(["ADMIN"]),
  UserController.bulkDeleteUsers
);
router.post("/forget-password", UserController.forgetPassword);
router.post("/reset-password", UserController.resetPassword);
router.post("/change-password", auth, UserController.changePassword);

module.exports = router;
