const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const postSchema = new mongoose.Schema({
  ownerId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
  // ownerIdAsString: { type: String, required: true },
  postLocation: { type: String, required: true },
  postImage: { type: String, required: true },
  postCaption: { type: String, required: true },
  likedBy: { type: Array },
});

const validatePost = (post) => {
  const schema = Joi.object({
    ownerId: Joi.string().required(),
    postLocation: Joi.string().required(),
    postImage: Joi.string().required(),
    postCaption: Joi.string().required(),
  });
  return schema.validate(post);
};

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
module.exports.validate = validatePost;
