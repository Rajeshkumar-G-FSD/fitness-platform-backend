const Booking = require("../models/Booking");
// Fetch user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("classId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reschedule booking
exports.rescheduleBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { newDate } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { date: newDate },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//const Booking = require("../models/Booking");

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