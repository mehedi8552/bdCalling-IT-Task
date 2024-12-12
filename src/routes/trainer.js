const express = require("express");
const ClassSchedule = require("../models/ClassSchedule");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/schedules",
  authenticate,
  authorize("trainer"),
  async (req, res) => {
    try {
      // Fetch schedules where the logged-in trainer is assigned
      const schedules = await ClassSchedule.find({ trainer: req.user._id })
        .populate("trainees", "name email") // Populate trainee details (name and email only)
        .sort({ date: 1, time: 1 }); // Sort by date and time

      res.status(200).json({ success: true, message: "Schedules fetched", scheduleData: schedules });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Failed to fetch schedules", error: error.message });
    }
  }
);

module.exports = router;
