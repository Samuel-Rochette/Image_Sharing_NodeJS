const express = require("express");
const router = express.Router();

const ctrlImage = require("../controllers/image.controller");
const jwtHelper = require("../config/jwtHelper");

router.post("/upload", jwtHelper.verifyJwtToken, ctrlImage.upload);

module.exports = router;
