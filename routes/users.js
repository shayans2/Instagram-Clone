const express = require("express");
const userController = require("../controllers/userController");
// const auth = require("../middlewares/auth");
const router = express.Router();
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
  storage,
  fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
});
// Multer config END

router.get("/:id", userController.fetchUser);
router.post("/new", userController.register);
router.put("/edit/:id", upload.single("profileImage"), userController.edit);
router.put("/:type/:id", userController.handleFollow);

module.exports = router;
