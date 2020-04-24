const express = require("express");
const { Post, validate } = require("../models/post");
const router = express.Router();
const { User } = require("../models/user");
// const _ = require("lodash");
// const auth = require("../middleware/auth");

// DON'T FORGET TO ADD AUTH **

router.get("/followers/:id/:page/:size", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  const posts = await Post.where("ownerId")
    .in(user.followers)
    .populate("ownerId")
    .limit(req.params.size)
    .skip(req.params.size * (req.params.page - 1));

  // const posts = await Post.findOne({ _id: req.params.id }).populate("ownerId");
  res.send({
    posts,
    pagination: {
      page: req.params.page,
      size: req.params.size
    }
  });
  // console.log(posts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const postOwner = await User.findById(req.body.ownerId);
  // if (!postOwner) return res.status(400).send("Invalid user");

  let post = new Post({
    ownerId: req.body.ownerId,
    // ownerIdAsString: req.body.ownerId,
    postLocation: req.body.postLocation,
    postImage: req.body.postImage,
    postCaption: req.body.postCaption,
    likedBy: [],
  });
  await post.save();

  res.send(post);
});

router.put("/like/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likedBy: req.body.userId } },
    {
      new: true,
    }
  ).populate("ownerId");

  if (!post) return res.status(404).send("Post not found");

  res.status(200).send(post);
  console.log(post);
});

router.put("/unlike/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likedBy: req.body.userId } },
    {
      new: true,
    }
  ).populate("ownerId");

  if (!post) return res.status(404).send("Post not found");

  res.status(200).send(post);
  console.log(post, "Shayan");
});

module.exports = router;
