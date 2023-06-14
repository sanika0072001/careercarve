const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const User = require("../../model/user");
// Welcome endpoint
router.get("/welcome", (req, res) => {
    res.status(200).json({
      success: true,
      message: "API successfully called",
    });
  });
// Register a new user
router.post('/register', async (req, res) => {
    try {
      const { name, email, password, phone_no } = req.body;
  
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        phone_no,
      });

      // Hash password before saving in database
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'Signed up successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const { phone_no } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the phone number
      user.phone_no = phone_no;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Phone number changed / added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send the user data
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
  
      // User is authenticated successfully
      res.json({ success: true, message: "hewwo" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  module.exports = router;
  
  
module.exports = router;
