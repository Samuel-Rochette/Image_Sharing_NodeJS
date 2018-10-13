const express = require("express");
const router = express.Router();

const ctrlImage = require("../controllers/image.controller");
const jwtHelper = require("../services/jwt.service");

router.get("/", ctrlImage.getAll);
router.get("/imagedetail/:imageId", ctrlImage.getOne);
router.post(
  "/comment/:imageId",
  jwtHelper.verifyJwtToken,
  ctrlImage.postComment
);
router
  .route("/favorites")
  .post(jwtHelper.verifyJwtToken, ctrlImage.saveImage)
  .get(jwtHelper.verifyJwtToken, ctrlImage.getFavorites);
router.delete(
  "/favorites/:imageId",
  jwtHelper.verifyJwtToken,
  ctrlImage.unsaveImage
);
router.get("/pages/:pageNum", ctrlImage.getPage);
router.post("/upload/image", jwtHelper.verifyJwtToken, ctrlImage.upload);
router.delete("/upload/image/:imageId", jwtHelper.verifyJwtToken, ctrlImage.deleteOne);
router.post("/upload/data", jwtHelper.verifyJwtToken, ctrlImage.uploadData);
router.get("/random", ctrlImage.getRandom);
router.get("/pagelength", ctrlImage.getPageLength);
router.get("/myimages", jwtHelper.verifyJwtToken, ctrlImage.getMyImages);

module.exports = router;
