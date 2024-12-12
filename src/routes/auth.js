const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const checkEmail = require("../middleware/CheckEmail");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!checkEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email format" });
    }
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      UserData: user,
    });
  } catch (err) {
    res.status(400).json({
      sussess: false,
      message: "Registration failed",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!checkEmail(email)) {
    return res.status(401).json({ message: "Incorrect email format" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.set("Authorization", `Bearer ${token}`);
    res.json({
      success: true,
      message: "Login successful and token set on header",
      UserData: user,
    });
  } catch (err) {
    res.status(401).json({
      sussess: false,
      message: "Unauthorized access",
      error: err.message,
    });
  }
});

module.exports = router;
