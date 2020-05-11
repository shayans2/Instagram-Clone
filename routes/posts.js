const express = require("express");
const router = express.Router();
const PostService = require("../services/postService");
const auth = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectId");
const postImage = require("../config/multer");

router.get(
  "/followers/:id/:page/:limit",
  [auth, validateObjectId],
  PostService.fetchTimeline
);
router.get("/:id", [auth, validateObjectId], PostService.fetchSinglePost);
router.get("/profile/:id", validateObjectId, PostService.fetchProfilePosts);
router.post("/new", [auth, postImage.single("postImage")], PostService.newPost);
router.put("/:type/:id", [auth, validateObjectId], PostService.handleLike);

module.exports = router;
