const express = require("express");
const router = express.Router();

const ctrlImage = require("../controllers/image.controller");
const jwtHelper = require("../services/jwt.service");

router.get("/", ctrlImage.getAll);
router.get("/:imageId", ctrlImage.getOne);
router.post("/:imageId/comment", jwtHelper.verifyJwtToken, ctrlImage.postComment);
router.get("/pages/:pageNum", ctrlImage.getPage);
router.post("/upload", jwtHelper.verifyJwtToken, ctrlImage.upload);

module.exports = router;
