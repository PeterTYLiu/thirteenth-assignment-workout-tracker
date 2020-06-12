const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
    default: 0,
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
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
