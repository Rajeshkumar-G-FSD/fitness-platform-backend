const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router();

// Get all classes
router.get("/", classController.getClasses);

// Book a class
router.post("/", classController.bookClass);

router.post("/", classController.createClass);

module.exports = router;

