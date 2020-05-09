const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const validationService = require("../services/validation");
const config = require("config");
const Jimp = require("jimp");
const sizeOf = require("image-size");
const fs = require("fs");
const _ = require("lodash");

class UserController {
  async fetchUser(req, res) {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  }

  async handleFollow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.params.type === "follow"
          ? { $addToSet: { followers: req.body.followerId } }
          : { $pull: { followers: req.body.followerId } },
        {
          new: true,
        }
      );

      await User.findByIdAndUpdate(
        req.body.followerId,
        req.params.type === "follow"
          ? { $addToSet: { followers: req.params.id } }
          : { $pull: { followers: req.params.id } },
        {
          new: true,
        }
      );

      if (!user) return res.status(404).send("User not found");

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }

  async register(req, res) {
    try {
      const { error } = validationService("user", req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let userEmail = await User.findOne({ email: req.body.email });
      if (userEmail) return res.status(400).send("Email already exists.");

      let username = await User.findOne({ username: req.body.username });
      if (username) return res.status(400).send("Username already exists.");

      user = new User(
        _.pick(req.body, ["fullname", "username", "email", "password"])
      );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(token);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }

  async edit(req, res) {
    try {
      if (req.file) {
        const dimensions = sizeOf(req.file.path);
        if (dimensions.height < 300 || dimensions.width < 300) {
          try {
            fs.unlinkSync(req.file.path);
          } catch (err) {
            console.log(err);
          }
          return res.status(400).send("Image height or width too small.");
        }

        Jimp.read(req.file.path)
          .then((opt) => {
            return opt.cover(300, 300).quality(75).write(req.file.path);
          })
          .catch((err) => {
            console.error(err);
          });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          fullname: req.body.fullname,
          profileImage: req.file
            ? config.get("URL") + req.file.path
            : req.body.profileImage,
          email: req.body.email,
          website: req.body.website,
          biography: req.body.biography,
        },
        {
          new: true,
        }
      );

      await user.save();

      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(token);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }
}

module.exports = new UserController();
