const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

// Submit feedback
router.post("/", feedbackController.submitFeedback);

// Fetch trainer reviews
router.get("/:trainerId/reviews", feedbackController.getTrainerReviews);

// Fetch feedback for a trainer
router.get("/:trainerId", feedbackController.getTrainerFeedback);

// Trainer responds to feedback
router.put("/:feedbackId/respond", feedbackController.respondToFeedback);

module.exports = router;



