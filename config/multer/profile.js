const multer = require("multer");

const profileStorage = multer.diskStorage({
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
  setTimeout(() => {
    const type = file.mimetype;
    if (type == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }, 5000);
}

const profilePicture = multer({
  dest: "./",
  storage: profileStorage,
  fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024,
  // },
});

module.exports = profilePicture;
