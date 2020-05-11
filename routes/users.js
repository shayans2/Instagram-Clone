const express = require("express");
const UserService = require("../services/userService");
const auth = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectId");
const router = express.Router();
const profilePicture = require("../config/multer");

router.get("/:id", validateObjectId, UserService.fetchUser);
router.post("/new", UserService.register);
router.put(
  "/edit/:id",
  [auth, validateObjectId, profilePicture.single("profileImage")],
  UserService.edit
);
router.put("/:type/:id", [auth, validateObjectId], UserService.handleFollow);

module.exports = router;
