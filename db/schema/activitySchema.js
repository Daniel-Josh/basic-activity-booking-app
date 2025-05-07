const mongoose = require("../connection");

const activityDataModel = new mongoose.model("activitydata", {
  title: String,
  description: String,
  location: String,
  date: Date,
  time: String,
},"activitydata");

module.exports = activityDataModel;