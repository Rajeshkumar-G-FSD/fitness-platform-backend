const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

//Get user profile (protected route)
router.get("/profile", auth, userController.getProfile);

// Update user profile (protected route)
router.put("/profile", auth, userController.updateProfile);

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Update user profile
router.put("/:userId/profile", userController.updateUserProfile);

module.exports = router;

// User Dashboard
router.get("/:userId/dashboard", userController.getUserDashboard);

module.exports = router;