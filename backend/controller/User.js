const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("../routes/UserRoute");

// REGISTER
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email || password)) {
    return res.status(400).json({
      success: false,
      message: "Please enter fields",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    return res.status(400).json({
      success: false,
      message: "Please enter fields",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const encryptPassword = await bcrypt.compare(password, user.password);
      if (encryptPassword) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, token });
      } else {
        res.status(404).json({
          success: false,
          message: "Please enter correct email or password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Please enter correct email or password",
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// UPDATE USER
exports.updateUser = async (req, res, next) => {
  let { password } = req.body;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// DELETE USER
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET SINGLE USER
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET USER STATS
exports.userStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear) - 1);

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
