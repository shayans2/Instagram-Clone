const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, minlength: 3, maxlength: 50 },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
    lowercase: true,
  },
  profileImage: { type: String, lowercase: true, trim: true },
  userBiography: { type: String, maxlength: 255 },
  userWebsite: { type: String, maxlength: 1024 },
  followers: { type: Array },
  following: { type: Array },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      profileImage: this.profileImage,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).lowercase().trim().required(),
    profileImage: Joi.string(),
    userBiography: Joi.string().max(255),
    userWebsite: Joi.string().max(1024),
    email: Joi.string().min(3).max(255).lowercase().trim().email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validate = validateUser;
