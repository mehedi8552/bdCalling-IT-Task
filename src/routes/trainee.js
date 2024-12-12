const express = require("express");
const User = require("../models/User");
const ClassSchedule = require("../models/ClassSchedule");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/profile",
  authenticate,
  authorize("trainee"),
  async (req, res) => {
    try {
      const trainee = await User.findByIdAndUpdate(
        req.user._id,
        { $set: req.body },
        { new: true }
      );
      if (!trainee)
        return res.status(404).json({ message: "Trainee not found" });

      res.status(200).json(trainee);
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Unauthorized access.",
        error: err.message,
      });
    }
  }
);

router.post(
  "/book-class/:scheduleId",
  authenticate,
  authorize("trainee"),
  async (req, res) => {
    const { scheduleId } = req.params;
    try {
      const schedule = await ClassSchedule.findById(scheduleId);

      if (!schedule)
        return res.status(404).json({ message: "Class schedule not found" });

      if (schedule.trainees.length >= 10) {
        return res.status(400).json({
          success: false,
          message:
            "Class schedule is full. Maximum 10 trainees allowed per schedule.",
        });
      }

      if (schedule.trainees.includes(req.user._id)) {
        return res
          .status(400)
          .json({ message: "Trainee already booked in this class" });
      }

      schedule.trainees.push(req.user._id);
      let result = await schedule.save();

      res.status(201).json({
        success: true,
        message: "Class booked successfully",
        Data: result,
      });
    } catch (err) {
      res
        .status(400)
        .json({
          success: false,
          message: "Class booking failed",
          error: err.message,
        });
    }
  }
);

module.exports = router;
