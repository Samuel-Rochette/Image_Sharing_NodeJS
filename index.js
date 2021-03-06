require("./config/config");
require("./models/db");
require("./services/passport.service");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const logger = require("morgan");

const rtsIndex = require("./routes/index.router");
const rtsImage = require("./routes/image.router");

var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(fileUpload());
app.use(logger("dev"));
app.use(express.static("assets"));

app.use("/api", rtsIndex);
app.use("/image", rtsImage);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

app.listen(process.env.PORT, () =>
  console.log("Server listening at port: " + process.env.PORT)
);
