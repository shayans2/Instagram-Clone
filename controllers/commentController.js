const validationService = require("../services/validation");
const { Comment } = require("../models/comment");
const { User } = require("../models/user");
const { Post } = require("../models/post");

class CommentController {
  async fetchComment(req, res) {
    const comment = await Comment.find({ postId: req.params.id }).populate(
      "userId"
    );
    if (!comment) return res.status(400).send("Invalid post");
    res.send(comment);
  }

  async new(req, res) {
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
  }
}

module.exports = new CommentController();
