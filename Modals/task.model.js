const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema({
  title: String,
  status: Boolean,
  date: String,
  userID: String,
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = { taskModel };
