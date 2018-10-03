const express = require("express");
const router = express.Router();

const ctrlImage = require("../controllers/image.controller");
const jwtHelper = require("../services/jwt.service");

router.get("/", ctrlImage.getAll);
router.get("imagedetail/:imageId", ctrlImage.getOne);
router.post(
  "/comment/:imageId",
  jwtHelper.verifyJwtToken,
  ctrlImage.postComment
);
router
  .route("/favorites")
  .post(jwtHelper.verifyJwtToken, ctrlImage.saveImage)
  .get(jwtHelper.verifyJwtToken, ctrlImage.getFavorites)
  .delete(jwtHelper.verifyJwtToken, ctrlImage.unsaveImage);
router.get("/pages/:pageNum", ctrlImage.getPage);
router.post("/upload", jwtHelper.verifyJwtToken, ctrlImage.upload);

module.exports = router;
