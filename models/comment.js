const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
});

const validateComment = (comment) => {
  const schema = Joi.object({
    content: Joi.string().required(),
  });
  return schema.validate(comment);
};

const Comment = mongoose.model("Comment", commentSchema);

module.exports.Comment = Comment;
module.exports.validate = validateComment;
