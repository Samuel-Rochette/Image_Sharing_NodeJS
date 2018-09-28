const express = require("express");
const router = express.Router();

const ctrlImage = require("../controllers/image.controller");
const jwtHelper = require("../services/jwt.service");

router.post("/upload", jwtHelper.verifyJwtToken, ctrlImage.upload);

module.exports = router;
