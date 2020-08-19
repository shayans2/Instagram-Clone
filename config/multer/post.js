const multer = require("multer");

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    fileName = Date.now() + ".jpg";
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
  }, 2000);
}

const postImage = multer({
  dest: "./",
  storage: postStorage,
  fileFilter,
});

module.exports = postImage;
