const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  title: String,
  description: String,
  path: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const PhotoDao = mongoose.model("photos", PhotoSchema);

module.exports = PhotoDao;
