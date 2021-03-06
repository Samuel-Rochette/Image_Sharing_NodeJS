const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "username required",
    unique: true
  },
  email: {
    type: String,
    required: "email required",
    unique: true
  },
  password: {
    type: String,
    required: "password required",
    unique: true,
    minlength: [4, "password must be at least 4 characters in length"]
  },
  saltSecret: {
    type: String
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }]
});

userSchema.path("email").validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail");

userSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP
  });
};

mongoose.model("User", userSchema);
