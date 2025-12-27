const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

const router = express.Router();

//register user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    await User.create({
      email: email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

//log in user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const userData = await User.findOne({ email: email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const accessToken = generateAccessToken(userData._id);
    const refreshToken = generateRefreshToken(userData._id);

    
    userData.refreshToken = refreshToken;
    await userData.save();

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

//refresh token
router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    
    const userData = await User.findOne({ refreshToken: refreshToken });
    if (!userData) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    //verify jwt 
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decodedData) => {
        if (error) {
          return res.status(403).json({ message: "Refresh token expired" });
        }

        // generate new access token
        const newAccessToken = generateAccessToken(decodedData.userId);

        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Token refresh failed" });
  }
});

module.exports = router;
