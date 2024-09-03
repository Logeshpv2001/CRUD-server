// models/UserHistoryModel.js
const mongoose = require("mongoose");

const UserHistorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  age: String,
  department: String,
  employmentStatus: String,
  updatedAt: { type: Date, default: Date.now },
});

const UserHistoryModel = mongoose.model("userHistories", UserHistorySchema);

module.exports = UserHistoryModel;
