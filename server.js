const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require("path");

// Open the database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Create the Express app
const app = express();

// Assign Express global middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API routes
app.get("/api/workouts", (req, res, next) => {
  db.Workout.find({})
    .then((dbWorkouts) => res.json(dbWorkouts))
    .catch(next);
});

app.get("/api/workouts/range", (req, res, next) => {
  db.Workout.find({})
    .limit(7)
    .then((dbWorkouts) => res.json(dbWorkouts))
    .catch(next);
});

app.put("/api/workouts/:id", (req, res, next) => {
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((dbWorkout) => res.status(201).json(dbWorkout))
    .catch(next);
});

app.post("/api/workouts", ({ body }, res, next) => {
  db.Workout.create(body)
    .then((dbWorkout) => res.status(201).json(dbWorkout))
    .catch(next);
});

// HTML routes

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

// Start listening for HTTP requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);
