const express = require("express");
const ClassSchedule = require("../models/ClassSchedule");
const User = require("../models/User");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/schedule", authenticate, authorize("admin"), async (req, res) => {
  try {
    const { date, startTime, trainerId } = req.body;

    // Input validation
    if (!date || !startTime || !trainerId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: date, startTime, trainerId",
      });
    }
    // Check if trainer exists
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const parsedDate = new Date(date);
    const startTimeDate = new Date(
      Date.parse(parsedDate.toDateString() + " " + startTime)
    );
    const endTimeDate = new Date(startTimeDate.getTime() + 2 * 60 * 60 * 1000);

    if (
      isNaN(parsedDate.getTime()) ||
      isNaN(startTimeDate.getTime()) ||
      isNaN(endTimeDate.getTime())
    ) {
      return res.status(400).json({ message: "Invalid Date or Time format" });
    }

    // Daily schedule limit validation
    const dailySchedules = await ClassSchedule.find({
      date: parsedDate,
      trainer: trainerId,
    });

    if (dailySchedules.length >= 5) {
      return res.status(400).json({
        success: false,
        message:
          "Trainer already has 5 schedules for the day. Maximum 5 schedules allowed per day.",
      });
    }

    // Time slot validation
    const existingSchedules = await ClassSchedule.find({
      date: parsedDate,
      trainer: trainerId,
      $or: [
        { startTime: { $gte: startTimeDate, $lt: endTimeDate } },
        { endTime: { $gt: startTimeDate, $lte: endTimeDate } },
      ],
    });

    if (existingSchedules.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Time slot conflict" });
    }

    // Create new class schedule
    const schedule = await ClassSchedule.create({
      date: parsedDate,
      startTime: startTimeDate,
      endTime: endTimeDate,
      trainer: trainerId,
      trainees: [],
    });

    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Schedule creation failed",
      error: err.message,
    });
  }
});

router.post("/create-trainer",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const trainer = await User.create({
        name,
        email,
        password,
        role: "trainer",
      });
      res.status(201).json({
        success: true,
        message: "Trainer created",
        trainerData: trainer,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Trainer creation failed.",
        error: err.message,
      });
    }
  }
);

router.get(
  "/find-all-trainer",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const trainers = await User.find({ role: "trainer" }).select("-password");
      res.status(200).json({
        success: true,
        message: "Trainers found",
        TrainersData: trainers,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Trainers not found",
        error: err.message,
      });
    }
  }
);

router.put("/findby-trainer-id/:id",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const trainer = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!trainer)
        return res
          .status(404)
          .json({ success: false, message: "Trainer not found" });
        res.status(200).json({
        success: true,
        message: "Trainer found",
        TrainersData: trainer,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Trainer not found",
        error: err.message,
      });
    }
  }
);

router.delete("/remove-trainer-by-id/:id",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const trainer = await User.findByIdAndDelete(id);
      if (!trainer)
        return res.status(404).json({success: false, message: "Trainer not found" });
      res.status(200).json({
        success: true,
        message: "Trainer deleted successfully",
        TrainerData: trainer,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Trainer not removed",
        error: err.message,
      });
    }
  }
);

module.exports = router;
