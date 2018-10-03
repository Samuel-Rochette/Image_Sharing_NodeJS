const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: "must be logged in to leave a comment"
  },
  message: {
    type: String,
    required: "cannot post blank comment"
  }
});

mongoose.model("Comment", commentSchema);

module.exports = commentSchema;
