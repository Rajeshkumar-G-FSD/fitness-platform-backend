const Feedback = require("../models/Feedback");
const Trainer = require("../models/Trainer");
const User = require("../models/User");
exports.submitFeedback = async (req, res) => {
  try {
    const { trainerId, userId, rating, comment } = req.body;

    // Validate input
    if (!trainerId || !userId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new feedback
    const feedback = new Feedback({ trainerId, userId, rating, comment });
    await feedback.save();

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch feedback for a specific trainer
exports.getTrainerFeedback = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Fetch feedback for the trainer and populate user details
    const feedback = await Feedback.find({ trainerId }).populate("userId");

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Trainer responds to feedback
exports.respondToFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { response } = req.body;

    // Update the feedback with the trainer's response
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { trainerResponse: response },
      { new: true }
    );

    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Fetch all reviews (feedback) for a specific trainer
exports.getTrainerReviews = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Check if the trainer exists
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    // Fetch all feedback for the trainer and populate user details
    const reviews = await Feedback.find({ trainerId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete feedback (optional, for admin use)
exports.deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Check if the feedback exists
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    // Delete the feedback
    await Feedback.findByIdAndDelete(feedbackId);

    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//