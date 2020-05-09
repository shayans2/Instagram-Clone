const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  location: { type: String, required: true },
  postImage: { type: String, required: true },
  caption: { type: String, required: true },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // likedBy: { type: Array },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
