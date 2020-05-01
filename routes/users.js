const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();
const Jimp = require("jimp");
var sizeOf = require("image-size");
const fs = require("fs");
const multer = require("multer");

// Multer config START * Needs refactor *
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile");
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    fileName = req.params.id + "-" + req.body.username + ".jpg";
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

var upload = multer({
  dest: "./",
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
});
// Multer config END

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.send(user);
});

router.post("/new", async (req, res) => {
  const { error } = validate(req.body);
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
});

router.put("/edit/:id", upload.single("profileImage"), async (req, res) => {
  // ***************************
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

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
        ? `http://localhost:4000/${req.file.path}`
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
});

router.post("/follow/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { followers: req.body.followerId } },
    {
      new: true,
    }
  );

  await User.findByIdAndUpdate(
    req.body.followerId,
    { $addToSet: { following: req.params.id } },
    {
      new: true,
    }
  );

  if (!user) return res.status(404).send("User not found");

  res.status(200).send(user);
});

router.put("/unfollow/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $pull: { followers: req.body.followerId } },
    {
      new: true,
    }
  );

  await User.findByIdAndUpdate(
    req.body.followerId,
    { $pull: { following: req.params.id } },
    {
      new: true,
    }
  );

  if (!user) return res.status(404).send("User not found");
  console.log(user);
  res.status(200).send(user);
});

module.exports = router;
