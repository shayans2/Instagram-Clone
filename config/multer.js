const multer = require("multer");

const storage = multer.diskStorage({
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

const profilePicture = multer({
  dest: "./",
  storage,
  fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
});

const postImage = multer({
  dest: "./",
  storage,
  fileFilter,
});

module.exports = profilePicture;
module.exports = postImage;
