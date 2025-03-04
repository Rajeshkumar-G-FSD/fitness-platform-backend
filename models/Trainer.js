const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },
  video: { type: String },
  qualifications: [{ type: String }],
  expertise: [{ type: String }],
  availableSlots: [{ type: String }],
  availability: {
    date: { type: String },
    timeSlots: [{ type: String }],
  },
});

module.exports = mongoose.model("Trainer", TrainerSchema);