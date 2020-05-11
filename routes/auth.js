const AuthService = require("../services/authService");
const express = require("express");
const router = express.Router();

router.post("/", AuthService.userAuth);

module.exports = router;
