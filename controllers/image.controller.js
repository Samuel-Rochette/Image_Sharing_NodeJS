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
        if (
          req.files.image.name.indexOf(".png") != -1 ||
          req.files.image.name.indexOf(".jpg") != -1 ||
          req.files.image.name.indexOf(".gif") != -1
        ) {
          let image = new Image();
          image.uploadedby = user.username;
          image.path = req.files.image.name;
          image.name = "Temporary";
          image.comments = [];
          image.save((err, doc) => {
            if (!err) {
              res.send(doc);
            } else {
              res.send(err);
            }
          });
        } else
          return res
            .status(400)
            .json({ status: false, message: "Wrong file type" });
      });
    }
  });
};

module.exports.uploadData = (req, res, next) => {
  Image.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description || "no description"
      }
    },
    (err, image) => {
      if (!err) {
        res.send(image);
      } else next(err);
    }
  );
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
      if (req.params.pageNum > images.pages) {
        res
          .status(400)
          .json({ status: false, message: "cannot GET non-existant page" });
      } else res.send(images.docs);
    } else {
      next(err);
    }
  });
};

module.exports.getPageLength = (req, res, next) => {
  Image.paginate({}, { page: req.params.pageNum, limit: 9 }, (err, images) => {
    if (!err) {
      if (req.params.pageNum > images.pages) {
        res
          .status(400)
          .json({ status: false, message: "cannot GET non-existant page" });
      } else res.send(images.total.toString());
    } else {
      next(err);
    }
  });
};

module.exports.getMyImages = (req, res, next) => {
  User.findById(req._id, (err, user) => {
    if (!err) {
      Image.find({ uploadedby: user.username }, (err, images) => {
        if (!err) {
          res.send(images);
        } else next(err);
      });
    } else next(err);
  });
};

module.exports.getOne = (req, res, next) => {
  Image.findById(req.params.imageId, (err, image) => {
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

module.exports.saveImage = (req, res, next) => {
  Image.findById(req.body.imageId, (err, image) => {
    if (!err) {
      User.findById(req._id, (err, user) => {
        if (!err) {
          if (user.favorites.indexOf(image._id) == -1) {
            user.favorites.push(image._id);
            user.save((err, doc) => {
              if (!err) {
                res.send(doc);
              } else next(err);
            });
          } else {
            res.status(400).json({
              status: false,
              message: "cannot save duplicate of image"
            });
          }
        } else next(err);
      });
    } else next(err);
  });
};

module.exports.unsaveImage = (req, res, next) => {
  Image.findById(req.params.imageId, (err, image) => {
    if (!err) {
      User.findById(req._id, (err, user) => {
        if (!err) {
          if (user.favorites.indexOf(image._id) != -1) {
            let index = user.favorites.indexOf(image._id);
            user.favorites.splice(user.favorites.indexOf(image._id), 1);
            user.save((err, doc) => {
              if (!err) {
                res.send(doc);
              } else next(err);
            });
          } else {
            res.status(400).json({
              status: false,
              message: "deleting non-existant favorite"
            });
          }
        } else next(err);
      });
    } else next(err);
  });
};

module.exports.getFavorites = (req, res, next) => {
  User.findById(req._id)
    .populate("favorites")
    .exec((err, user) => {
      if (!err) {
        res.send(user.favorites);
      } else next(err);
    });
};

module.exports.getRandom = (req, res, next) => {
  Image.find({}, (err, images) => {
    if (!err) {
      let index = Math.round(Math.random() * (images.length - 1));
      res.send(images[index]);
    } else next(err);
  });
};

module.exports.deleteOne = (req, res, next) => {
  Image.findByIdAndRemove(req.params.imageId, (err, image) => {
    if (!err) {
      res.send(image);
    } else next(err);
  });
};
