const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: "must be logged in to leave a comment"
  },
  message: {
    type: String,
    required: "cannot post blank comment"
  }
});

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: "filename required",
    unique: true
  },
  uploadedby: {
    type: String,
    required: "must be logged in to upload image"
  },
  description: String,
  comments: [commentSchema]
});

mongoose.model("Image", imageSchema);
