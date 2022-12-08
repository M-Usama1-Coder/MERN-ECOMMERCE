const express = require("express");
const {
  register,
  login,
  updateUser,
  deleteUser,
  getUserDetails,
  getAllUsers,
  userStats,
} = require("../controller/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAdmin, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUserDetails);
router.get("/find", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
