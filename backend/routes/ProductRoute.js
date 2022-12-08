const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  productDetails,
  getAllProducts,
} = require("../controller/Product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/product", verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", productDetails);
router.get("/", getAllProducts);

module.exports = router;
