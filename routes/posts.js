const express = require("express");
const { Post, validate } = require("../models/post");
const router = express.Router();
const { User } = require("../models/user");
const Jimp = require("jimp");
var sizeOf = require("image-size");
const fs = require("fs");
const multer = require("multer");
// const _ = require("lodash");
// const auth = require("../middleware/auth");

// Multer config START * Needs refactor *
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    fileName = Date.now() + ".jpg";
    cb(null, fileName);
  },
});

function fileFilter(req, file, cb) {
  const type = file.mimetype;
  if (type == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({ dest: "./", storage: storage, fileFilter: fileFilter });
// Multer config END

// DON'T FORGET TO ADD AUTH **

router.get("/followers/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  const posts = await Post.where("userId")
    .in(user.following)
    .sort({ date: "desc" })
    .populate("userId");
  // const posts = await Post.findOne({ _id: req.params.id }).populate("userId");
  res.send(posts);
  // console.log(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("userId");
  res.send(post);
});

router.get("/profile/:id", async (req, res) => {
  const post = await Post.find({ userId: req.params.id }).populate("userId");
  res.send(post);
});

router.post("/new", upload.single("postImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const postOwner = await User.findById(req.body.userId);
  if (!postOwner) return res.status(400).send("Invalid user");

  if (req.file) {
    const dimensions = sizeOf(req.file.path);
    if (dimensions.height < 200 || dimensions.width < 200) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.log(err);
      }
      return res.status(400).send("Image height or width too small.");
    }

    Jimp.read(req.file.path)
      .then((opt) => {
        return opt.cover(600, 600).quality(90).write(req.file.path);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let post = new Post({
    userId: req.body.userId,
    location: req.body.location,
    postImage: req.file
      ? `http://localhost:4000/${req.file.path}`
      : req.body.postImage,
    caption: req.body.caption,
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
  ).populate("userId");

  if (!post) return res.status(404).send("Post not found");

  res.status(200).send(post);
});

router.put("/unlike/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likedBy: req.body.userId } },
    {
      new: true,
    }
  ).populate("userId");

  if (!post) return res.status(404).send("Post not found");

  res.status(200).send(post);
});

module.exports = router;
