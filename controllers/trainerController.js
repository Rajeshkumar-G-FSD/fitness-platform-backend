const Trainer = require("../models/Trainer");
const Review = require("../models/Review"); // Ensure this import is correct

// Get all trainers
exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch trainer profile
exports.getTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;

    // Fetch trainer details
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found." });
    }

    // Fetch classes taught by the trainer
    const classes = await Class.find({ trainer: trainerId });

    res.status(200).json({ trainer, classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch trainer reviews
exports.getTrainerReviews = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const reviews = await Review.find({ trainerId }).populate("userId");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit trainer review
exports.submitTrainerReview = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { rating, comment } = req.body;
    const review = new Review({ trainerId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update trainer profile
exports.updateTrainerProfile = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const updateData = req.body;
    const updatedTrainer = await Trainer.findByIdAndUpdate(trainerId, updateData, { new: true });
    res.status(200).json(updatedTrainer);
  } catch (error) {
    res.status(500).json({ message: "Error updating trainer profile", error });
  }
};

// Update trainer availability
exports.updateTrainerAvailability = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const { date, timeSlots } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(
      trainerId,
      { availability: { date, timeSlots } },
      { new: true }
    );
    res.status(200).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};