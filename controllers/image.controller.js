const mongoose = require("mongoose");

const User = mongoose.model("User");
const Image = mongoose.model("Image");

module.exports.upload = (req, res, next) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    } else {
      let file = req.files.image;
      file.name = file.name.replace(" ", "_");

      file.mv("./assets/img/" + req.files.image.name, err => {
        if (err) {
          return res.status(500).send(err);
        }
        let image = new Image();
        image.uploadedby = user.username;
        image.description = req.body.description || "no description";
        image.filename = req.files.image.name;
        image.comments = [];
        image.save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            next(err);
          }
        });
      });
    }
  });
};
