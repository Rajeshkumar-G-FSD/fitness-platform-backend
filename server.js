const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin:'http://localhost:5173'
}));
app.use(express.json());

// Database connection
connectDB();

// Routes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/trainers", require("./routes/trainerRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes")); // Add this line
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});