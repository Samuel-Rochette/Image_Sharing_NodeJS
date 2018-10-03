const mongoose = require("mongoose");

const User = mongoose.model("User");
const Image = mongoose.model("Image");
const Comment = mongoose.model("Comment");

module.exports.upload = (req, res, next) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  User.findById(req._id, (err, user) => {
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
        image.path = req.files.image.name;
        image.name = req.body.name;
        image.comments = [];
        image.save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            res.send(err);
          }
        });
      });
    }
  });
};

module.exports.getAll = (req, res, next) => {
  Image.find({}, (err, images) => {
    if (!err) {
      res.send(images);
    } else next(err);
  });
};

module.exports.getPage = (req, res, next) => {
  Image.paginate({}, { page: req.params.pageNum, limit: 9 }, (err, images) => {
    if (!err) {
      res.send(images);
    } else {
      next(err);
    }
  });
};

module.exports.getOne = (req, res, next) => {
  Image.findById(req.params.imageId)
    .populate("comments")
    .exec((err, image) => {
      if (!err) {
        res.send(image);
      } else next(err);
    });
};

module.exports.postComment = (req, res, next) => {
  Image.findById(req.params.imageId, (err, image) => {
    if (!err) {
      User.findById(req._id, (err, user) => {
        if (!err) {
          let comment = new Comment();
          comment.author = user.username;
          comment.message = req.body.message;
          image.comments.push(comment);
          image.save((err, doc) => {
            if (!err) {
              res.send(doc);
            } else next(err);
          });
        } else next(err);
      });
    } else next(err);
  });
};
