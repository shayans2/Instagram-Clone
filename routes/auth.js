const authController = require("../controllers/authConrtoller");
const express = require("express");
const router = express.Router();

router.post("/", authController.userAuth);

module.exports = router;
