const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  orderStats,
} = require("../controller/Order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getAllOrders);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/income", verifyTokenAndAdmin, orderStats);

module.exports = router;
