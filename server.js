require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin");
const traineeRoutes = require("./src/routes/trainee");
const trainerRoutes = require("./src/routes/trainer");
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trainee", traineeRoutes);
app.use("/api/trainer", trainerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log("Server run successed on port", process.env.PORT)
    )
  )
  .catch((err) => console.error(err));

