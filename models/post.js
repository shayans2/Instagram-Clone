const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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

const validatePost = (post) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    location: Joi.string().required(),
    postImage: Joi.string(),
    caption: Joi.string().required(),
  });
  return schema.validate(post);
};

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
module.exports.validate = validatePost;
