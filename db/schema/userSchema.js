const mongoose = require("../connection");

const userDataModel = new mongoose.model("userdata", {
  name: String,
  phone_number: { type: String, required: true, match: /^[0-9+ ]+$/ }, // Phone number validation
  email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
  password: String,
  booked_activity: Array,
},"userdata");

module.exports = userDataModel;
