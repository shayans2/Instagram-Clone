const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const postImage = require("../config/multer");

router.get("/followers/:id/:page/:limit", auth, postController.fetchTimeline);
router.get("/:id", auth, postController.fetchSinglePost);
router.get("/profile/:id", postController.fetchProfilePosts);
router.post(
  "/new",
  [auth, postImage.single("postImage")],
  postController.newPost
);
router.put("/:type/:id", auth, postController.handleLike);

module.exports = router;
