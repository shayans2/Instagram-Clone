const express = require("express");
const router = express.Router();
const { Comment, validate } = require("../models/comment");
const { User } = require("../models/user");
const { Post } = require("../models/post");

router.get("/posts/:id", async (req, res) => {
  const comment = await Comment.find({ postId: req.params.id }).populate(
    "userId"
  );
  if (!comment) return res.status(400).send("Invalid post");
  res.send(comment);
});

router.post("/new", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const postId = await Post.findById(req.body.postId);
  if (!postId) return res.status(400).send("Invalid post");

  const userId = await User.findById(req.body.userId);
  if (!userId) return res.status(400).send("Invalid user");

  let comment = new Comment({
    postId: req.body.postId,
    userId: req.body.userId,
    content: req.body.content,
  });
  await comment.save();

  res.send(comment);
});

module.exports = router;
