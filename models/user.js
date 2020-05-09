const mongoose = require("mongoose");
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
    trim: true,
  },
  profileImage: {
    type: String,
    required: true,
    default: `${config.get("URL")}uploads/default-profile.jpg`,
  },
  biography: { type: String, maxlength: 255 },
  website: { type: String, maxlength: 1024, lowercase: true, trim: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // followers: { type: Array },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // following: { type: Array },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  date: { type: Date, default: Date.now() },
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
      website: this.website,
      biography: this.biography,
      followers: this.followers,
      following: this.following,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
