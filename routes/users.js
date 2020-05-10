const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();
const profilePicture = require("../config/multer");

router.get("/:id", userController.fetchUser);
router.post("/new", userController.register);
router.put(
  "/edit/:id",
  [auth, profilePicture.single("profileImage")],
  userController.edit
);
router.put("/:type/:id", auth, userController.handleFollow);

module.exports = router;
