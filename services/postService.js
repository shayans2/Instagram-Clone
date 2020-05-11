const { Post } = require("../models/post");
const { User } = require("../models/user");
const validationService = require("../utility/validation");
const config = require("config");
const Jimp = require("jimp");
const sizeOf = require("image-size");
const fs = require("fs");

class PostService {
  async fetchTimeline(req, res) {
    const { page = 1, limit = 5 } = req.params;
    const user = await User.findById(req.params.id).select("-password");
    const postsCount = await Post.where("userId")
      .in(user.following)
      .countDocuments();
    const posts = await Post.where("userId")
      .in(user.following)
      .sort({ date: "desc" })
      .populate("userId")
      .limit(limit * 1)
      .skip(limit * (page - 1));
    res.send({ posts, postsCount, page });
    try {
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async fetchSinglePost(req, res) {
    const post = await Post.findById(req.params.id).populate("userId");
    res.send(post);
  }

  async fetchProfilePosts(req, res) {
    const post = await Post.find({ userId: req.params.id })
      .sort({ date: "desc" })
      .populate("userId");
    res.send(post);
  }

  async handleLike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.params.type === "like"
          ? { $addToSet: { likedBy: req.body.userId } }
          : { $pull: { likedBy: req.body.userId } },
        {
          new: true,
        }
      ).populate("userId");

      if (!post) return res.status(404).send("Post not found");

      res.status(200).send(post);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }

  async newPost(req, res) {
    try {
      const { error } = validationService("post", req.body);
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
          ? config.get("URL") + req.file.path
          : req.body.postImage,
        caption: req.body.caption,
      });
      await post.save();

      res.send(post);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }
}

module.exports = new PostService();
