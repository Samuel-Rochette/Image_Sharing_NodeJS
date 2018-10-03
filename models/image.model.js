const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var commentSchema = require("./comment.model");

var imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name required",
    unique: true
  },
  path: {
    type: String,
    required: "path required",
    unique: true
  },
  uploadedby: {
    type: String,
    required: "must be logged in to upload image"
  },
  description: String,
  comments: [commentSchema]
});
imageSchema.plugin(mongoosePaginate);

mongoose.model("Image", imageSchema);
