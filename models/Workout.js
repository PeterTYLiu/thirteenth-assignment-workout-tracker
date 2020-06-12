const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: { type: Date, default: Date.now },
    exercises: [
      {
        name: {
          type: String,
          trim: true,
          required: "Name is Required",
        },

        type: {
          type: String,
          trim: true,
          required: "Type is Required",
        },

        duration: {
          type: Number,
          required: "duration is required",
        },

        weight: {
          type: Number,
        },

        reps: {
          type: Number,
        },

        sets: {
          type: Number,
        },

        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  }
);

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce(
    (total, exercise) => total + exercise.duration,
    0
  );
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
