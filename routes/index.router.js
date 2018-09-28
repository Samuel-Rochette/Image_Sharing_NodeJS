const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../services/jwt.service");

router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;
