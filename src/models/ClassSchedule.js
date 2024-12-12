const mongoose = require("mongoose");

const classScheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});
classScheduleSchema.path('startTime').get(function(value) {
  return moment(value, 'HH:mm:ss').toDate();
});

module.exports = mongoose.model("ClassSchedules", classScheduleSchema);

