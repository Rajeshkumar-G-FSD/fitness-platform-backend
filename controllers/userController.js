const User = require("../models/User");
const Booking = require("../models/Booking");
const Class = require("../models/Class");



// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fitnessGoals, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { fitnessGoals, preferences },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get User Dashboard Data
exports.getUserDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const user = await User.findById(userId).populate("bookings");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch upcoming classes (bookings with future dates)
    const currentDate = new Date();
    const upcomingClasses = await Booking.find({
      userId,
      date: { $gte: currentDate },
    }).populate("classId");

    // Fetch booking history (past bookings)
    const bookingHistory = await Booking.find({
      userId,
      date: { $lt: currentDate },
    }).populate("classId");

    // Fetch class recommendations based on user preferences
    const recommendations = await Class.find({
      type: { $in: user.preferences.split(",") }, // Match user preferences
    }).limit(5); // Limit to 5 recommendations

    // Return dashboard data
    res.status(200).json({
      upcomingClasses,
      bookingHistory,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, fitnessGoals, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, fitnessGoals, preferences },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
