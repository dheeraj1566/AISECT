// const mongoose = require('mongoose');
import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
  author: String,
  recipient: String,
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Letter', letterSchema);
