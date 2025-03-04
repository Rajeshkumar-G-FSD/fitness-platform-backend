const Class = require("../models/Class");
const Booking = require("../models/Booking");
// Book a class
exports.bookClass = async (req, res) => {
  try {
    const { userId, classId, date, time } = req.body;

    // Validate input
    if (!userId || !classId || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new booking
    const booking = new Booking({ userId, classId, date, time });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Create a new class
exports.createClass = async (req, res) => {
  try {
    const { name, description, type, duration, date, time, trainer } = req.body;

    // Validate input
    if (!name || !type || !duration || !date || !time || !trainer) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new class
    const newClass = new Class({
      name,
      description,
      type,
      duration,
      date,
      time,
      trainer,
    });

    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all classes with filters
exports.getClasses = async (req, res) => {
  try {
    const { type, duration, time } = req.query;
    const filters = {};

    // Add filters based on query parameters
    if (type) filters.type = type;
    if (duration) filters.duration = duration;
    if (time) filters.time = time;

    // Fetch classes and populate the trainer field
    const classes = await Class.find(filters).populate("trainer");

    // Log the fetched classes for debugging
    console.log("Fetched classes:", classes);

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: error.message });
  }
};
