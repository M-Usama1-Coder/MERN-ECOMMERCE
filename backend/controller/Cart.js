const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// CREATE CART
exports.createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE CART
exports.updateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// DELETE CART
exports.deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Cart DETAILS
exports.getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET ALL CartS
exports.getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
